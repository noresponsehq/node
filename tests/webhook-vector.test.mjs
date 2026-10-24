// The contract's signature vector through the generated webhook verifier.
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { readdirSync } from "node:fs";
import test from "node:test";
import { constructEvent, webhookEventToJSON, WebhookVerificationError } from "../dist/esm/index.js";
import { fixture } from "./helpers.mjs";

const VECTOR = fixture("webhook-signature-vector.json");
const SECRETS = { [VECTOR.key_id]: VECTOR.secret_utf8 };
const NOW = Number(VECTOR.timestamp);

test("the vector verifies into a typed assessment event", async () => {
  const event = await constructEvent(VECTOR.payload, VECTOR.headers, SECRETS, { now: NOW });
  assert.equal(event.type, "assessment.updated");
  assert.equal(event.data.id, "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM");
  assert.equal(event.data.detail.assessmentVersion, 2);
});

test("a tampered, stale, unknown, repeated or incomplete delivery is refused", async () => {
  const { "NR-Webhook-Id": _, ...missingId } = VECTOR.headers;
  const cases = {
    invalid_signature: [VECTOR.payload + " ", VECTOR.headers, SECRETS, NOW],
    invalid_timestamp: [VECTOR.payload, VECTOR.headers, SECRETS, NOW + 301],
    unknown_key: [VECTOR.payload, VECTOR.headers, { whk_other0001: VECTOR.secret_utf8 }, NOW],
    duplicate_header: [VECTOR.payload, { ...VECTOR.headers, "nr-webhook-signature": VECTOR.headers["NR-Webhook-Signature"] }, SECRETS, NOW],
    missing_header: [VECTOR.payload, missingId, SECRETS, NOW],
  };
  for (const [code, [payload, headers, secrets, now]] of Object.entries(cases)) {
    await assert.rejects(constructEvent(payload, headers, secrets, { now }), (e) => e instanceof WebhookVerificationError && e.code === code, code);
  }
});

const EVENT_FIXTURES = readdirSync(new URL("./fixtures/valid/", import.meta.url))
  .filter((name) => /^webhook-.*\.json$/.test(name) && fixture("valid/" + name).type)
  .sort();

test("the contract has event fixtures", () => assert.ok(EVENT_FIXTURES.includes("webhook-account-risk-changed.json")));

for (const name of EVENT_FIXTURES) {
  test(`${name} parses into its typed event`, async () => {
    const body = fixture("valid/" + name);
    const raw = JSON.stringify(body);
    const signature = "v1=" + createHmac("sha256", "fixture-secret").update(`${NOW}.${raw}`).digest("hex");
    const headers = { "NR-Webhook-Id": body.id, "NR-Webhook-Timestamp": String(NOW), "NR-Webhook-Key-Id": "whk_fixture0001", "NR-Webhook-Signature": signature };
    const event = await constructEvent(raw, headers, { whk_fixture0001: "fixture-secret" }, { now: NOW });
    assert.equal(event.type, body.type);
    assert.deepEqual(JSON.parse(webhookEventToJSON(event)), body);
  });
}
