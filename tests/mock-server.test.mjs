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
    identifiers: { email: "new.user@example.com" },
  });
  assert.match(assessment.assessmentId, /^asm_/);
  assert.equal(assessment.accountId, "acct_7f3a9c");
});

test("get returns the documented assessment", { skip }, async () => {
  const assessment = await client().assessments.get("asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM");
  assert.match(assessment.assessmentId, /^asm_/);
});
