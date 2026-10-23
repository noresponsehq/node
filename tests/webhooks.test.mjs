import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { NoResponse, constructEvent, isExpiredEvent, verificationResponse, WebhookVerificationError } from "../dist/esm/index.js";
import { COMPLETE, fixture } from "./helpers.mjs";

const vector = fixture("webhook-signature-vector.json");
const payload = Buffer.from(vector.payload, "utf8");
const secrets = { [vector.key_id]: vector.secret_utf8 };
const now = Number(vector.timestamp);
const headers = vector.headers;

const code = (fn, expected) =>
  assert.throws(fn, (error) => {
    assert.ok(error instanceof WebhookVerificationError, error.constructor.name);
    assert.equal(error.code, expected, error.message);
    return true;
  });

const signed = (body, secret, timestamp, id, keyId = "whk_sdktest01") => {
  const raw = Buffer.from(JSON.stringify(body), "utf8");
  const digest = createHmac("sha256", secret).update(timestamp).update(".").update(raw).digest("hex");
  return { raw, headers: [["NR-Webhook-Id", id], ["NR-Webhook-Timestamp", timestamp], ["NR-Webhook-Key-Id", keyId], ["NR-Webhook-Signature", "v1=" + digest]] };
};

test("the shared signature vector verifies and yields a typed assessment", () => {
  const event = constructEvent(payload, headers, secrets, { now });
  assert.equal(event.type, "assessment.updated");
  assert.equal(event.id, headers["NR-Webhook-Id"]);
  assert.equal(event.createdAt, "2026-10-14T09:00:02.000Z");
  assert.equal(event.data.assessmentId, "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM");
  assert.equal(event.data.assessmentVersion, 2);
  assert.equal(event.data.risk.recommendation, "step_up");
  assert.deepEqual(event.data.risk.reasons[0], { code: "no_digital_footprint", weight: 35 });
  assert.equal(isExpiredEvent(event), false);
  // The same through the client, as a string body, a Headers object and a Node headers object.
  assert.equal(NoResponse.webhooks.constructEvent(vector.payload, new Headers(headers), secrets, { now }).data.assessmentId, event.data.assessmentId);
  const node = Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
  assert.equal(new NoResponse({ apiKey: "k".repeat(20) }).webhooks.constructEvent(payload, node, secrets, { now }).id, event.id);
});

test("tampering, staleness, repeated headers, unknown keys and bad signatures are refused", () => {
  code(() => constructEvent(Buffer.concat([payload, Buffer.from(" ")]), headers, secrets, { now }), "invalid_signature");
  code(() => constructEvent(payload, headers, secrets, { now: now + 301 }), "invalid_timestamp");
  code(() => constructEvent(payload, headers, secrets, { now: now - 301 }), "invalid_timestamp");
  assert.equal(constructEvent(payload, headers, secrets, { now: now + 301, toleranceSeconds: 600 }).id, headers["NR-Webhook-Id"]);
  code(() => constructEvent(payload, [...Object.entries(headers), ["nr-webhook-id", "duplicate"]], secrets, { now }), "duplicate_header");
  code(() => constructEvent(payload, [...Object.entries(headers), ["nr-webhook-ID", headers["NR-Webhook-Id"]]], secrets, { now }), "duplicate_header");
  code(() => constructEvent(payload, { ...headers, "NR-Webhook-Id": [headers["NR-Webhook-Id"], headers["NR-Webhook-Id"]] }, secrets, { now }), "duplicate_header");
  const { "NR-Webhook-Signature": _dropped, ...missing } = headers;
  code(() => constructEvent(payload, missing, secrets, { now }), "missing_header");
  code(() => constructEvent(payload, headers, { whk_other0001: vector.secret_utf8 }, { now }), "unknown_key");
  code(() => constructEvent(payload, headers, { [vector.key_id]: "other-secret" }, { now }), "invalid_signature");
  code(() => constructEvent(payload, { ...headers, "NR-Webhook-Signature": "v2=abc" }, secrets, { now }), "invalid_signature");
  code(() => constructEvent(payload, headers, Object.create({ [vector.key_id]: vector.secret_utf8 }), { now }), "unknown_key");
});

test("two secrets verify during a rotation and the event id must match the header", () => {
  const event = { id: "evt_01JA2ZB4N5P6Q7R8S9T0VWXYZ2", type: "assessment.updated", created_at: "2026-10-18T11:00:04Z", data: COMPLETE };
  const stamp = String(1791968402);
  const { raw, headers: h } = signed(event, "new-secret", stamp, event.id, "whk_sdktest02");
  const both = { whk_sdktest01: "old-secret", whk_sdktest02: "new-secret" };
  const verified = constructEvent(raw, h, both, { now: 1791968402 });
  assert.equal(verified.data.assessmentId, COMPLETE.assessment_id);
  assert.equal(verified.data.assessmentVersion, COMPLETE.assessment_version);
  const mismatched = signed(event, "new-secret", stamp, "evt_01JA2ZB4N5P6Q7R8S9T0VWXYZ9", "whk_sdktest02");
  code(() => constructEvent(mismatched.raw, mismatched.headers, both, { now: 1791968402 }), "invalid_payload");
  const pointer = { id: event.id, type: "assessment.updated", created_at: event.created_at, data: { assessment_id: COMPLETE.assessment_id, assessment_url: "/v1/assessments/x" } };
  const p = signed(pointer, "new-secret", stamp, event.id, "whk_sdktest02");
  code(() => constructEvent(p.raw, p.headers, both, { now: 1791968402 }), "invalid_payload");
});

test("the expired event is typed and terminal, and endpoint.verification echoes the challenge", () => {
  const expired = fixture("valid/webhook-assessment-expired.json");
  const stamp = "1791968402";
  const e = signed(expired, "secret", stamp, expired.id);
  const event = constructEvent(e.raw, e.headers, { whk_sdktest01: "secret" }, { now: 1791968402 });
  assert.ok(isExpiredEvent(event));
  assert.deepEqual(event.data, { assessmentId: expired.data.assessment_id, accountId: expired.data.account_id, assessmentVersion: 2, status: "expired", changeReason: "expired" });
  assert.throws(() => verificationResponse(event), WebhookVerificationError);

  const ping = fixture("valid/webhook-endpoint-verification.json");
  const v = signed(ping, "secret", stamp, ping.id);
  const verification = constructEvent(v.raw, v.headers, { whk_sdktest01: "secret" }, { now: 1791968402 });
  assert.equal(verification.type, "endpoint.verification");
  assert.equal(verification.data.endpointId, ping.data.endpoint_id);
  assert.deepEqual(verificationResponse(verification), { challenge: ping.data.challenge });
  assert.deepEqual(NoResponse.webhooks.verificationResponse(verification), { challenge: ping.data.challenge });
});

test("account.deleted is typed and carries the erased account", () => {
  const erased = fixture("valid/webhook-account-deleted.json");
  const d = signed(erased, "secret", String(now), erased.id);
  const event = constructEvent(d.raw, d.headers, { whk_sdktest01: "secret" }, { now });
  assert.equal(event.type, "account.deleted");
  assert.equal(event.test, false);
  assert.deepEqual(event.data, { accountId: "acct_7f3a9c", assessmentsDeleted: 3, deletedAt: "2026-10-23T09:00:00.000Z" });
  assert.equal(isExpiredEvent(event), false);
  assert.throws(() => verificationResponse(event), WebhookVerificationError);
  for (const mutate of [
    (body) => { body.data.assessments_deleted = 0; },
    (body) => { body.data.assessments_deleted = 1.5; },
    (body) => { body.data.account_id = "jane@example.com"; },
    (body) => { delete body.data.deleted_at; },
  ]) {
    const body = structuredClone(erased);
    mutate(body);
    const bad = signed(body, "secret", String(now), body.id);
    code(() => constructEvent(bad.raw, bad.headers, { whk_sdktest01: "secret" }, { now }), "invalid_payload");
  }
});

// The API adds fields without a new version, so keys this SDK does not know
// must not stop a signed event from verifying.
test("unknown fields are accepted", () => {
  for (const name of [
    "invalid/webhook-tenant-id.json",
    "invalid/webhook-identifier-leak.json",
    "invalid/webhook-expired-with-assessment-url.json",
    "invalid/webhook-account-deleted-assessment-id.json",
  ]) {
    const body = fixture(name);
    const signedBody = signed(body, "secret", String(now), body.id);
    assert.equal(constructEvent(signedBody.raw, signedBody.headers, { whk_sdktest01: "secret" }, { now }).id, body.id);
  }
});

test("the contract-invalid webhook fixtures and malformed identifiers are refused", () => {
  for (const name of [
    "invalid/webhook-update-names-source.json",
    "invalid/webhook-unknown-event-type.json",
    "invalid/webhook-update-pointer-only.json",
    "invalid/webhook-update-with-expired-status.json",
    "invalid/webhook-verification-without-challenge.json",
    "invalid/webhook-account-deleted-none.json",
  ]) {
    const body = fixture(name);
    const signedBody = signed(body, "secret", String(now), body.id);
    code(() => constructEvent(signedBody.raw, signedBody.headers, { whk_sdktest01: "secret" }, { now }), "invalid_payload");
  }

  const valid = fixture("valid/webhook-endpoint-verification.json");
  for (const mutate of [
    (body) => { body.id = "evt_bad"; },
    (body) => { body.data.endpoint_id = "whe_bad"; },
    (body) => { body.created_at = "tomorrow"; },
    (body) => { body.created_at = "2026-10-14"; },
  ]) {
    const body = structuredClone(valid);
    mutate(body);
    const signedBody = signed(body, "secret", String(now), body.id);
    code(() => constructEvent(signedBody.raw, signedBody.headers, { whk_sdktest01: "secret" }, { now }), "invalid_payload");
  }
});

test("a test event says so, and a real one does not", () => {
  const sample = fixture("valid/webhook-assessment-updated-test.json");
  const real = fixture("valid/webhook-assessment-updated.json");
  const stamp = String(1791968402);
  const s = signed(sample, "secret", stamp, sample.id);
  const event = constructEvent(s.raw, s.headers, { whk_sdktest01: "secret" }, { now: 1791968402 });
  assert.equal(event.test, true);
  assert.equal(event.data.assessmentId, sample.data.assessment_id);
  const r = signed(real, "secret", stamp, real.id);
  assert.equal(constructEvent(r.raw, r.headers, { whk_sdktest01: "secret" }, { now: 1791968402 }).test, false);
});
