import assert from "node:assert/strict";
import test from "node:test";
import { NoResponse, KeyUsageBuffer, hashIssuedCredential } from "../dist/esm/index.js";
import { fakeFetch, fixture, json, problem } from "./helpers.mjs";

const KEY = "nrk_live_01JA2Z8K6Q4V7W9XBCDEFGHJKM_k3Yx8pQ2mN7vR4tW6zB9cD1eF5gH0jL4sP9uV2wX7yA";
const RECEIPT = fixture("valid/key-usage-batch.json");
const ISSUED = "sk_issued_to_account_7f3a9c_0123456789";
const HASH = hashIssuedCredential(ISSUED);
const FAST_RETRY = {
  strategy: "backoff",
  backoff: { initialInterval: 1, maxInterval: 5, maxElapsedTime: 2000, exponent: 1.1 },
  retryConnectionErrors: true,
};

const client = (fetcher, options = {}) => new NoResponse({ apiKey: KEY, fetch: fetcher, ...options });
const accept = () => json(RECEIPT, { status: 202 });
const fact = (i = 0) => ({ keySha256: HASH, ip: `203.0.113.${i % 250}`, userAgent: "curl/8.7.1", model: "gpt-4o-mini", inputTokens: 10, outputTokens: 2 });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test("keyUsage.record posts one batch with an idempotency key and returns meta", async () => {
  const { fetcher, calls } = fakeFetch([json(RECEIPT, { status: 202, headers: { "idempotent-replayed": "true" } })]);
  const answer = await client(fetcher).keyUsage.record({ events: [{ keySha256: HASH, ip: "203.0.113.24", occurredAt: "2026-10-23T09:14:07Z" }] });
  assert.equal(answer.id, RECEIPT.id);
  assert.equal(answer.accepted, RECEIPT.accepted);
  assert.equal(answer.meta.idempotentReplayed, true);
  assert.equal(calls[0].method, "POST");
  assert.ok(calls[0].url.endsWith("/v1/key_usage/batches"));
  assert.match(calls[0].headers["idempotency-key"], /^[0-9a-f-]{36}$/);
  assert.deepEqual(calls[0].body, { events: [{ key_sha256: HASH, ip: "203.0.113.24", occurred_at: "2026-10-23T09:14:07Z", sample_rate: 1 }] });
});

test("the buffer sends once batchSize facts are queued", async () => {
  const { fetcher, calls } = fakeFetch(() => accept());
  const buffer = client(fetcher).keyUsage.buffer({ batchSize: 3, flushIntervalMs: 60_000 });
  buffer.record(fact(1));
  buffer.record(fact(2));
  await sleep(10);
  assert.equal(calls.length, 0);
  buffer.record(fact(3));
  await buffer.flush();
  assert.equal(calls.length, 1);
  assert.equal(calls[0].body.events.length, 3);
  assert.deepEqual(buffer.stats(), { queued: 0, sent: 3, dropped: 0, failed: 0, invalid: 0 });
  await buffer.close();
});

test("the buffer sends on its interval", async () => {
  const { fetcher, calls } = fakeFetch(() => accept());
  const buffer = client(fetcher).keyUsage.buffer({ flushIntervalMs: 20 });
  buffer.record(fact());
  for (let i = 0; i < 50 && calls.length === 0; i++) await sleep(10);
  assert.equal(calls.length, 1);
  await buffer.close();
});

test("close sends what is queued and refuses later facts", async () => {
  const { fetcher, calls } = fakeFetch(() => accept());
  const buffer = client(fetcher).keyUsage.buffer({ flushIntervalMs: 60_000 });
  buffer.record(fact(1));
  buffer.record(fact(2));
  await buffer.close();
  assert.equal(calls.length, 1);
  assert.equal(calls[0].body.events.length, 2);
  buffer.record(fact(3));
  assert.equal(buffer.stats().dropped, 1);
  assert.equal(calls.length, 1);
});

test("a full queue drops the oldest facts and counts them", async () => {
  const { fetcher, calls } = fakeFetch(() => accept());
  const buffer = client(fetcher).keyUsage.buffer({ maxQueue: 3, batchSize: 500, flushIntervalMs: 60_000 });
  for (let i = 1; i <= 5; i++) buffer.record({ ...fact(), ip: `203.0.113.${i}` });
  assert.deepEqual(buffer.stats(), { queued: 3, sent: 0, dropped: 2, failed: 0, invalid: 0 });
  await buffer.close();
  assert.deepEqual(calls[0].body.events.map((event) => event.ip), ["203.0.113.3", "203.0.113.4", "203.0.113.5"]);
});

test("record never throws, and refuses garbage as invalid", async () => {
  const { fetcher, calls } = fakeFetch(() => accept());
  const buffer = client(fetcher).keyUsage.buffer({ flushIntervalMs: 60_000 });
  const garbage = [undefined, null, 7, "x", {}, { ip: "203.0.113.1" }, { keySha256: "nothex", ip: "203.0.113.1" },
    { keySha256: HASH }, { keySha256: HASH, ip: 4 }, { keySha256: HASH, ip: "203.0.113.1", occurredAt: "yesterday" },
    { key: "", ip: "203.0.113.1" }];
  for (const value of garbage) assert.doesNotThrow(() => buffer.record(value));
  assert.equal(buffer.stats().invalid, garbage.length);
  // Bad optional fields are left out, not the fact.
  buffer.record({ keySha256: HASH.toUpperCase(), ip: "203.0.113.9", model: "bad model!", inputTokens: -1, outputTokens: 1.5,
    userAgent: "a\nb" + "c".repeat(600) });
  await buffer.close();
  const [event] = calls[0].body.events;
  assert.equal(event.key_sha256, HASH);
  assert.equal(event.model, undefined);
  assert.equal(event.input_tokens, undefined);
  assert.equal(event.output_tokens, undefined);
  assert.equal(event.user_agent.length, 512);
  assert.ok(!event.user_agent.includes("\n"));
});

test("a raw key is hashed in process and never sent", async () => {
  const { fetcher, calls } = fakeFetch(() => accept());
  const buffer = client(fetcher).keyUsage.buffer({ flushIntervalMs: 60_000 });
  buffer.record({ key: ISSUED, ip: "203.0.113.24" });
  await buffer.close();
  const raw = JSON.stringify(calls[0]);
  assert.ok(!raw.includes(ISSUED));
  assert.equal(calls[0].body.events[0].key_sha256, HASH);
});

test("batches split at 500 events and at 256 KiB", async () => {
  const { fetcher, calls } = fakeFetch(() => accept());
  const buffer = client(fetcher).keyUsage.buffer({ batchSize: 500, flushIntervalMs: 60_000, maxQueue: 100_000 });
  for (let i = 0; i < 1200; i++) buffer.record({ keySha256: HASH, ip: "203.0.113.1" });
  await buffer.flush();
  assert.deepEqual(calls.map((call) => call.body.events.length), [500, 500, 200]);
  calls.length = 0;
  // About 700 bytes per event: 500 of them would pass 256 KiB.
  for (let i = 0; i < 500; i++) buffer.record({ keySha256: HASH, ip: "203.0.113.1", userAgent: "u".repeat(512), model: "m".repeat(128) });
  await buffer.close();
  assert.ok(calls.length >= 2);
  assert.equal(calls.reduce((sum, call) => sum + call.body.events.length, 0), 500);
  for (const call of calls) assert.ok(Buffer.byteLength(JSON.stringify(call.body)) <= 256 * 1024);
});

test("a retried batch keeps its idempotency key, and each batch gets its own", async () => {
  const { fetcher, calls } = fakeFetch([problem(503, "service_unavailable"), accept(), accept()]);
  const buffer = client(fetcher, { retryConfig: FAST_RETRY }).keyUsage.buffer({ flushIntervalMs: 60_000 });
  buffer.record(fact(1));
  await buffer.flush();
  buffer.record(fact(2));
  await buffer.close();
  assert.equal(calls.length, 3);
  assert.equal(calls[0].headers["idempotency-key"], calls[1].headers["idempotency-key"]);
  assert.notEqual(calls[1].headers["idempotency-key"], calls[2].headers["idempotency-key"]);
  assert.equal(buffer.stats().sent, 2);
});

test("a failed batch is counted and reported, and the buffer keeps going", async () => {
  const errors = [];
  const { fetcher, calls } = fakeFetch([problem(400, "invalid_request"), accept()]);
  const buffer = client(fetcher).keyUsage.buffer({ flushIntervalMs: 60_000, onError: (error) => errors.push(error) });
  buffer.record(fact(1));
  await buffer.flush();
  buffer.record(fact(2));
  await buffer.close();
  assert.equal(calls.length, 2);
  assert.equal(errors.length, 1);
  assert.deepEqual(buffer.stats(), { queued: 0, sent: 1, dropped: 0, failed: 1, invalid: 0 });
});

test("sampling records a share of facts and sends the rate", async () => {
  const { fetcher, calls } = fakeFetch(() => accept());
  const draws = [0.1, 0.9, 0.2, 0.8];
  const buffer = new KeyUsageBuffer(client(fetcher).keyUsage, { sampleRate: 0.5, random: () => draws.shift(), flushIntervalMs: 60_000 });
  for (let i = 0; i < 4; i++) buffer.record(fact(i));
  await buffer.close();
  assert.equal(calls[0].body.events.length, 2);
  assert.ok(calls[0].body.events.every((event) => event.sample_rate === 0.5));
});

test("options are checked when the buffer is made", () => {
  const nr = client(fakeFetch([]).fetcher);
  assert.throws(() => nr.keyUsage.buffer({ batchSize: 501 }), /batchSize/);
  assert.throws(() => nr.keyUsage.buffer({ sampleRate: 0 }), /sampleRate/);
  assert.throws(() => nr.keyUsage.buffer({ flushIntervalMs: -1 }), /flushIntervalMs/);
});
