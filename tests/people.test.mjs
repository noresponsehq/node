import assert from "node:assert/strict";
import test from "node:test";
import { NoResponse } from "../dist/esm/index.js";
import { fakeFetch, fixture, json, problem } from "./helpers.mjs";

const groupReport = fixture("valid/person-report-records.json");
const person = {
  id: groupReport.person.id,
  name: "Jordan Example",
  email: "jordan@example.com",
  created_at: "2026-11-15T10:00:00Z",
  updated_at: "2026-11-15T10:00:00Z",
  expires_at: "2026-12-15T10:00:00Z",
};
const investigation = {
  id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  person_id: person.id,
  group_id: null,
  status: "completed",
  depth: "standard",
  platforms: ["x"],
  match_state: "confirmed",
  highest_band: null,
  coverage: groupReport.person.coverage,
  spend: groupReport.person.spend,
  decision: null,
  created_at: person.created_at,
  expires_at: person.expires_at,
  deadline_at: "2026-11-15T10:15:00Z",
};
const apiKey = "nrk_0TESTKEY00000000000000000_" + "s".repeat(43);
const retryConfig = { strategy: "backoff", backoff: { initialInterval: 1, maxInterval: 5, maxElapsedTime: 2000, exponent: 1.1 } };

function client(answers) {
  const { fetcher, calls } = fakeFetch(answers);
  return { nr: new NoResponse({ apiKey, fetch: fetcher, retryConfig }), calls };
}

test("a workspace person is created without a group and exposes retention and suggestions", async () => {
  const { nr, calls } = client([json({ person, created: true, suggested_matches: [{ person_id: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKN", matched_on: ["email"] }] }, { status: 201 })]);
  const result = await nr.people.create({ body: { name: person.name, email: person.email }, idempotencyKey: "person-create-example-1" });
  assert.equal(new URL(calls[0].url).pathname, "/v1/people");
  assert.deepEqual(calls[0].body, { name: person.name, email: person.email });
  assert.equal(calls[0].headers["idempotency-key"], "person-create-example-1");
  assert.equal(result.result.person.id, person.id);
  assert.equal(result.result.person.expiresAt, person.expires_at);
  assert.equal(result.result.suggestedMatches[0].matchedOn[0], "email");
});

test("investigation retries keep the same key and person", async () => {
  const { nr, calls } = client([problem(503, "service_unavailable"), json(investigation, { status: 202, headers: { "retry-after": "1" } })]);
  const key = "investigation-example-1";
  const result = await nr.investigations.create({ idempotencyKey: key, body: { personId: person.id, depth: "standard", platforms: ["x"] } });
  assert.equal(result.result.id, investigation.id);
  assert.equal(calls.length, 2);
  for (const call of calls) {
    assert.equal(new URL(call.url).pathname, "/v1/investigations");
    assert.equal(call.headers["idempotency-key"], key);
    assert.deepEqual(call.body, { person_id: person.id, depth: "standard", platforms: ["x"] });
  }
});

test("workspace person and investigation reads retain complete structured records", async () => {
  const { profiles, findings, posts, media, lookup, reviews } = groupReport;
  const { nr, calls } = client([
    json({ ...person, evidence_investigation: investigation, profiles, findings, posts, media, lookup }),
    json({ person, investigation, profiles, findings, posts, media, lookup, reviews }),
  ]);
  const latest = (await nr.people.get({ personId: person.id })).result;
  const history = (await nr.investigations.get({ investigationId: investigation.id })).result;
  assert.equal(latest.evidenceInvestigation.id, investigation.id);
  assert.equal(latest.lookup.records[1].fields.find(field => field.field === "password_hash").detail, "bcrypt");
  assert.equal(history.investigation.groupId, null);
  assert.equal(history.lookup.records[0].source.site, "github.com");
  assert.deepEqual(calls.map(call => new URL(call.url).pathname), [`/v1/people/${person.id}`, `/v1/investigations/${investigation.id}`]);
});

for (const operation of ["create person", "review investigation"]) {
  test(`${operation} does not retry an uncertain mutation`, async () => {
    const { nr, calls } = client([problem(503, "service_unavailable"), problem(400, "invalid_request")]);
    const call = operation === "create person"
      ? nr.people.create({ body: { name: person.name } })
      : nr.investigations.review({ investigationId: investigation.id, body: { decision: "watch", note: "Review source records" } });
    await assert.rejects(call);
    assert.equal(calls.length, 1);
  });
}
