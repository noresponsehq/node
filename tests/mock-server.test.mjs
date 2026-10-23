// Smoke test of the client against the mock server.
//
// Skipped unless NORESPONSE_MOCK_URL names a running mock server
// (`generate_sdks.py mockserver --serve`). The mock server answers with the
// examples in the SDK document, so this proves the client's wiring (URL, auth
// header, request encoding, response parsing) and nothing about the live API.
import assert from "node:assert/strict";
import test from "node:test";
import { NoResponse } from "../dist/esm/index.js";

const MOCK_URL = process.env.NORESPONSE_MOCK_URL;
const skip = MOCK_URL ? false : "set NORESPONSE_MOCK_URL to a running mock server";
const client = () => new NoResponse({ apiKey: "nrk_mock_" + "k".repeat(20), baseUrl: MOCK_URL });

test("create returns the documented assessment", { skip }, async () => {
  const assessment = await client().assessments.create({
    accountId: "acct_7f3a9c",
    flow: "account_creation",
    identifiers: { email: "new.user@example.com" },
  });
  assert.match(assessment.id, /^asm_/);
  assert.equal(assessment.detail.accountId, "acct_7f3a9c");
});

test("get returns the documented assessment", { skip }, async () => {
  const assessment = await client().assessments.get("asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM");
  assert.match(assessment.id, /^asm_/);
  assert.equal(assessment.detail.assessmentId, assessment.id);
});

test("accounts.get returns the documented account", { skip }, async () => {
  const account = await client().accounts.get("acct_7f3a9c");
  assert.equal(account.id, "acct_7f3a9c");
  assert.match(account.assessmentId, /^asm_/);
  assert.equal(account.decisionsByFlow.accountCreation, account.risk.decision);
});

test("accounts.delete returns the documented deletion", { skip }, async () => {
  const deletion = await client().accounts.delete("acct_7f3a9c");
  assert.equal(deletion.id, "acct_7f3a9c");
  assert.equal(deletion.deleted, true);
  assert.equal(typeof deletion.assessmentsDeleted, "number");
});

test("assessments.delete returns the documented deletion", { skip }, async () => {
  const deletion = await client().assessments.delete("asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM");
  assert.match(deletion.id, /^asm_/);
  assert.equal(deletion.deleted, true);
  assert.equal(deletion.account.id, "acct_7f3a9c");
});

test("keyUsage.record returns the documented batch", { skip }, async () => {
  const batch = await client().keyUsage.record({ events: [{ keySha256: "2bdbf5c72f2a36df0ef40fb92203612274d4546f56dba946070a6a79c2401a1b", ip: "203.0.113.24", occurredAt: "2026-10-23T09:14:07Z" }] });
  assert.match(batch.id, /^kub_/);
  assert.equal(typeof batch.accepted, "number");
});

test("accounts.listAssessments returns the documented page", { skip }, async () => {
  const page = await client().accounts.listAssessments("acct_7f3a9c", { limit: 20 });
  assert.equal(page.accountId, "acct_7f3a9c");
  assert.ok(Array.isArray(page.items));
});
