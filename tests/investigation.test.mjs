import assert from "node:assert/strict";
import test from "node:test";
import { NoResponse, Requests, ConflictError } from "../dist/esm/index.js";
import { fixture, fakeFetch, json, problem } from "./helpers.mjs";

const examples = fixture("investigation-responses.json");
const accountId = examples.outcome.account_id;
const assessmentId = examples.revision.id;
const credentialId = examples.credential.id;
const from = "2026-10-01T00:00:00Z";
const to = "2026-10-02T00:00:00Z";
const key = "nrk_0TESTKEY00000000000000000_" + "s".repeat(43);
const idempotencyKey = "investigation-feedback-fixture";
const sha256 = "f".repeat(64);
const cases = [
  ["search", "POST", "/v1/assessments/search", 200,
    nr => nr.assessments.search({ from, to, decision: "block", limit: 1, cursor: "next_fixture" })],
  ["aggregate", "POST", "/v1/assessments/aggregate", 200,
    nr => nr.assessments.aggregate({ from, to, bucket: "day", groupBy: ["decision", "reason"], metrics: ["count", "late_flips"], revision: "first" })],
  ["revision", "GET", `/v1/assessments/${assessmentId}/versions/1`, 200,
    nr => nr.assessments.retrieveVersion({ assessmentId, version: 1, responseMode: "standard" })],
  ["binding", "POST", `/v1/assessments/${assessmentId}/bind`, 201,
    nr => nr.assessments.bindAccount({ assessmentId, body: { accountId } })],
  ["outcome", "POST", `/v1/accounts/${accountId}/outcomes`, 202,
    nr => nr.accounts.recordOutcome(accountId, { outcome: "confirmed_abuse", externalRef: "fixture-case" }, { idempotencyKey })],
  ["outcomes", "GET", `/v1/accounts/${accountId}/outcomes`, 200,
    nr => nr.accounts.listOutcomes({ accountId, limit: 1, cursor: "next_fixture" })],
  ["decision", "GET", `/v1/accounts/${accountId}/decisions/1`, 200,
    nr => nr.accounts.retrieveDecision({ accountId, riskVersion: 1 })],
  ["credential", "POST", `/v1/accounts/${accountId}/credentials`, 201,
    nr => nr.accounts.associateCredential({ accountId, body: { sha256 } })],
  ["credentials", "GET", `/v1/accounts/${accountId}/credentials`, 200,
    nr => nr.accounts.listCredentials({ accountId, limit: 1, cursor: "next_fixture" })],
  ["retired", "DELETE", `/v1/accounts/${accountId}/credentials/${credentialId}`, 200,
    nr => nr.accounts.retireCredential({ accountId, credentialId })],
  ["export", "GET", `/v1/accounts/${accountId}/export`, 200,
    nr => nr.accounts.export({ accountId, responseMode: "standard" })],
  ["requests", "GET", "/v1/requests", 200,
    nr => nr.requests.list({ from, to, requestId: "a".repeat(32), status: 200, limit: 1, cursor: "next_fixture" })],
];

for (const [name, method, pathname, status, call] of cases) {
  test(`public investigation client: ${name} reaches its HTTP operation and unwraps metadata`, async () => {
    const { fetcher, calls } = fakeFetch([json(examples[name], { status })]);
    const nr = new NoResponse({ apiKey: key, baseUrl: "https://example.com", fetch: fetcher });
    const result = await call(nr);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].method, method);
    assert.equal(new URL(calls[0].url).pathname, pathname);
    assert.equal(calls[0].headers.authorization, `Bearer ${key}`);
    assert.equal(result.meta.requestId, "a".repeat(32));
    assert.equal(result.result, undefined, "the public client returns the model, not the generated envelope");
    assert(!JSON.stringify(result).includes(key));
    if (name === "search") {
      assert.deepEqual(calls[0].body, { from, to, decision: "block", limit: 1, cursor: "next_fixture" });
      assert.equal(result.items[0].detail.assessmentVersion, examples.revision.detail.assessment_version);
    }
    if (name === "aggregate") {
      assert.deepEqual(calls[0].body, { from, to, bucket: "day", group_by: ["decision", "reason"], metrics: ["count", "late_flips"], limit: 20, revision: "first" });
      assert.equal(result.buckets[0].groups[0].reason, "aged_identity");
      assert.equal(result.buckets[0].lateFlips[0].to, "review");
    }
    if (name === "outcome") {
      assert.equal(calls[0].headers["idempotency-key"], idempotencyKey);
      assert.deepEqual(calls[0].body, { outcome: "confirmed_abuse", external_ref: "fixture-case" });
      assert.equal(result.riskVersion, 2);
    }
    if (name === "binding") assert.deepEqual(calls[0].body, { account_id: accountId });
    if (name === "credential") {
      assert.deepEqual(calls[0].body, { sha256 });
      assert.equal(result.sha256, undefined);
    }
    if (name === "retired") assert.equal(result.retiredBy.keyId, "fixture-key");
    if (name === "export") {
      assert(result.complete);
      assert.equal(result.decisions[0].account.riskVersion, 1);
    }
    if (name === "requests") {
      assert(nr.requests instanceof Requests);
      const query = new URL(calls[0].url).searchParams;
      assert.equal(query.get("from"), from);
      assert.equal(query.get("to"), to);
      assert.equal(query.get("request_id"), "a".repeat(32));
      assert.equal(query.get("status"), "200");
      assert.equal(result.items[0].decision.account.riskVersion, 1);
    }
    if (["outcomes", "credentials", "requests"].includes(name)) {
      assert.equal(new URL(calls[0].url).searchParams.get("cursor"), "next_fixture");
      assert.equal(result.nextCursor, "next_fixture");
    }
  });
}

test("account feedback supports generated input, default keys, and explicit corrections", async () => {
  const correction = { ...examples.outcome, outcome: "false_positive", supersedes: examples.outcome.id };
  const { fetcher, calls } = fakeFetch([json(examples.outcome, { status: 202 }), json(correction, { status: 202 })]);
  const nr = new NoResponse({ apiKey: key, fetch: fetcher });
  await nr.accounts.recordOutcome({ accountId, body: { outcome: "confirmed_abuse" } });
  const result = await nr.accounts.recordOutcome({
    accountId, idempotencyKey, body: { outcome: "false_positive", supersedes: examples.outcome.id },
  });
  assert.match(calls[0].headers["idempotency-key"], /^[0-9a-f-]{36}$/);
  assert.equal(calls[1].headers["idempotency-key"], idempotencyKey);
  assert.deepEqual(calls[1].body, { outcome: "false_positive", supersedes: examples.outcome.id });
  assert.equal(result.supersedes, examples.outcome.id);
});

test("a stale correction remains a typed conflict rather than a successful receipt", async () => {
  const { fetcher } = fakeFetch([problem(409, "outcome_conflict")]);
  const nr = new NoResponse({ apiKey: key, fetch: fetcher });
  await assert.rejects(
    nr.accounts.recordOutcome(accountId, { outcome: "false_positive", supersedes: examples.outcome.id }),
    error => error instanceof ConflictError && error.code === "outcome_conflict",
  );
});
