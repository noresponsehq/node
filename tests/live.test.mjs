// Consumer smoke test of the client against a live API.
//
// Skipped unless NORESPONSE_LIVE_URL and NORESPONSE_LIVE_API_KEY name an API
// and a key with the assess and history scopes (a test key keeps it off real
// sources). It assesses a synthetic account, replays the request, reads it
// back, waits for it to settle, lists its history and checks the typed 404.
// NORESPONSE_LIVE_WEBHOOK_VECTORS names deliveries the same API signed, in
// the shape of webhook-signature-vector.json, for the verifier. Each step
// writes its name to NORESPONSE_LIVE_REPORT, and "done" at the end, so a
// failure names the operation (integrations/regression/suites/sdks.sh).
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import test from "node:test";
import { constructEvent, NoResponse, NotFoundError, WebhookVerificationError } from "../dist/esm/index.js";

const { NORESPONSE_LIVE_URL: baseUrl, NORESPONSE_LIVE_API_KEY: apiKey, NORESPONSE_LIVE_WEBHOOK_VECTORS: vectors, NORESPONSE_LIVE_REPORT: report } = process.env;
const skip = baseUrl && apiKey ? false : "set NORESPONSE_LIVE_URL and NORESPONSE_LIVE_API_KEY to run against a live API";
const step = (name) => report && writeFileSync(report, name);

test("a consumer assesses, waits for and lists an account on the live API", { skip }, async () => {
  const nr = new NoResponse({ apiKey, baseUrl, timeoutMs: 30_000 });
  const accountId = `sdk-live-typescript-${process.env.NORESPONSE_LIVE_RUN ?? randomUUID().slice(0, 8)}`;
  const idempotencyKey = `sdk-live-${randomUUID()}`;
  const request = { accountId, flow: "account_creation", identifiers: { email: "sdk-live@example.com" } };

  step("create");
  const created = await nr.assessments.create(request, { idempotencyKey });
  assert.match(created.id, /^asm_/);
  assert.equal(created.detail.accountId, accountId);

  step("replay");
  assert.equal((await nr.assessments.create(request, { idempotencyKey })).id, created.id);

  step("get");
  assert.equal((await nr.assessments.get(created.id)).id, created.id);

  step("wait");
  const settled = await nr.assessments.wait(created.id, { timeoutMs: 60_000 });
  assert.ok(["complete", "partial"].includes(settled.status), settled.status);
  assert.ok(settled.account?.risk.decision);

  step("query");
  const history = await nr.assessments.query({ accountId, limit: 5 });
  assert.deepEqual([...new Set(history.items.map((item) => item.accountId))], [accountId]);
  assert.ok(history.items.some((item) => item.assessmentId === created.id));

  step("list_account_assessments");
  const page = await nr.accounts.listAssessments(accountId, { limit: 5 });
  assert.ok(page.items.some((item) => item.assessmentId === created.id));

  step("get_account");
  const account = await nr.accounts.get(accountId);
  assert.equal(account.id, accountId);
  assert.equal(account.risk.decision, settled.account.risk.decision);

  step("not_found");
  await assert.rejects(nr.assessments.get("asm_" + "0".repeat(26)), (e) => e instanceof NotFoundError && e.status === 404 && Boolean(e.code) && Boolean(e.requestId));

  if (vectors) {
    for (const vector of JSON.parse(readFileSync(vectors, "utf8"))) {
      step(`verify_webhook ${vector.type}`);
      const secrets = { [vector.key_id]: vector.secret_utf8 };
      const now = Number(vector.timestamp);
      assert.equal((await constructEvent(vector.payload, vector.headers, secrets, { now })).type, vector.type);
      await assert.rejects(constructEvent(vector.payload + " ", vector.headers, secrets, { now }), (e) => e instanceof WebhookVerificationError && e.code === "invalid_signature");
    }
  }
  step("done");
});
