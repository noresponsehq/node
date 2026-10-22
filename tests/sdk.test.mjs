import assert from "node:assert/strict";
import test, { mock } from "node:test";
import { inspect } from "node:util";
import {
  NoResponse,
  NoResponseError,
  APIStatusError,
  APIConnectionError,
  APITimeoutError,
  BadRequestError,
  AuthenticationError,
  PermissionDeniedError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  ResponseValidationError,
  ConnectionError,
  RequestTimeoutError,
  DEFAULT_BASE_URL,
  SDK_METADATA,
} from "../dist/esm/index.js";
import {
  COMPLETE,
  INTEGRATION_AUTH0,
  INTEGRATION_LIST,
  INTEGRATION_ROTATED,
  LIST,
  OUTCOME,
  PENDING,
  REQUEST,
  RISK,
  ROTATION,
  drive,
  fakeFetch,
  fixture,
  flush,
  json,
  problem,
  withEnv,
} from "./helpers.mjs";

const KEY = "nrk_0TESTKEY00000000000000000_" + "s".repeat(43);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const client = (fetcher, options = {}) => new NoResponse({ apiKey: KEY, fetch: fetcher, ...options });

test("construction reads the environment and defaults the base URL", () => {
  withEnv({ NORESPONSE_API_KEY: KEY, NORESPONSE_BASE_URL: undefined }, () => {
    const nr = new NoResponse();
    assert.equal(nr.baseUrl, DEFAULT_BASE_URL);
  });
  withEnv({ NORESPONSE_API_KEY: KEY, NORESPONSE_BASE_URL: "https://api-example.invalid/" }, () => {
    assert.equal(new NoResponse().baseUrl, "https://api-example.invalid");
  });
  withEnv({ NORESPONSE_API_KEY: undefined }, () => {
    assert.throws(() => new NoResponse(), /NORESPONSE_API_KEY/);
  });
  assert.throws(() => new NoResponse({ apiKey: "k\r\nX-Injected: 1" }), /line break/);
  assert.throws(() => new NoResponse({ apiKey: KEY, baseUrl: "http://api.noresponse.org" }), /HTTPS/);
  assert.doesNotThrow(() => new NoResponse({ apiKey: KEY, baseUrl: "http://localhost:8080" }));
  for (const bad of ["https://example.com/api?tenant=demo", "https://example.com/api#fragment", "https://example.com/api?"]) {
    assert.throws(() => new NoResponse({ apiKey: KEY, baseUrl: bad }), /query or fragment/);
  }
  assert.throws(() => new NoResponse({ apiKey: KEY, timeoutMs: 0 }), /timeoutMs/);
  assert.throws(() => new NoResponse({ apiKey: KEY, timeoutMs: 1.5 }), /timeoutMs/);
});

test("a string is shorthand for the API key", async () => {
  withEnv({ NORESPONSE_API_KEY: undefined, NORESPONSE_BASE_URL: undefined }, () => {
    assert.equal(new NoResponse(KEY).baseUrl, DEFAULT_BASE_URL);
    assert.throws(() => new NoResponse(""), /NORESPONSE_API_KEY/);
  });
  const { fetcher, calls } = fakeFetch([json(COMPLETE)]);
  const original = globalThis.fetch;
  globalThis.fetch = fetcher;
  try {
    await withEnv({ NORESPONSE_API_KEY: undefined, NORESPONSE_BASE_URL: undefined }, () =>
      new NoResponse(KEY).assessments.get(COMPLETE.assessment_id),
    );
  } finally {
    globalThis.fetch = original;
  }
  assert.equal(calls[0].headers.authorization, "Bearer " + KEY);
});

test("the key never appears when the client is printed", () => {
  const nr = new NoResponse({ apiKey: KEY });
  for (const rendered of [inspect(nr), JSON.stringify(nr), String(nr)]) {
    assert.ok(!rendered.includes(KEY), rendered);
  }
  assert.deepEqual(Object.keys(nr).includes("core"), false);
});

test("create sends the contract body and headers and returns the assessment with meta", async () => {
  const { fetcher, calls } = fakeFetch([
    json(PENDING, { status: 202, headers: { "retry-after": "2", location: "/v1/assessments/" + PENDING.assessment_id } }),
  ]);
  const nr = client(fetcher, { baseUrl: "https://example.com" });
  const assessment = await nr.assessments.create({
    ...REQUEST,
    policyContext: { flow: "login", region: "AU" },
    clientContext: { timezone: "Europe/London", platform: "web", formDurationMs: 1800 },
    responseMode: "detailed",
  });
  assert.equal(assessment.status, "pending");
  assert.equal(assessment.assessmentId, PENDING.assessment_id);
  assert.equal(assessment.recommendation, undefined);
  assert.deepEqual(assessment.meta, { requestId: "a".repeat(32), retryAfter: 2, location: "/v1/assessments/" + PENDING.assessment_id, idempotentReplayed: false });
  const [call] = calls;
  assert.equal(call.method, "POST");
  assert.equal(call.url, "https://example.com/v1/assessments");
  assert.equal(call.headers.authorization, "Bearer " + KEY);
  assert.equal(call.headers.accept, "application/json");
  assert.equal(call.headers["content-type"], "application/json");
  assert.match(call.headers["user-agent"], new RegExp("^noresponse-node/" + SDK_METADATA.sdkVersion.replace(/\./g, "\\.") + " \\(node/"));
  assert.match(call.headers["idempotency-key"], UUID);
  assert.deepEqual(call.body, {
    account_id: "usr_8f2k1",
    identifiers: { email: "jordan.lee@example.com", name: "Jordan Lee" },
    policy_context: { flow: "login", region: "AU" },
    client_context: { timezone: "Europe/London", platform: "web", form_duration_ms: 1800 },
    response_mode: "detailed",
  });
});

test("create accepts an explicit idempotency key and the generated request shape", async () => {
  const { fetcher, calls } = fakeFetch([json(RISK, { headers: { "idempotent-replayed": "true" } }), json(COMPLETE)]);
  const nr = client(fetcher);
  const first = await nr.assessments.create(REQUEST, { idempotencyKey: "signup-usr_8f2k1-0001" });
  assert.equal(first.status, "complete");
  assert.equal(first.risk.recommendation, RISK.risk.recommendation);
  assert.equal(first.risk.score, RISK.risk.score);
  assert.deepEqual(first.risk.reasons.map((reason) => reason.code), RISK.risk.reasons.map((reason) => reason.code));
  assert.equal(first.risk.summary.email.disposable, RISK.risk.summary.email.disposable);
  assert.equal(first.meta.idempotentReplayed, true);
  await nr.assessments.create({ body: REQUEST, idempotencyKey: "signup-usr_8f2k1-0002" });
  assert.equal(calls[0].headers["idempotency-key"], "signup-usr_8f2k1-0001");
  assert.equal(calls[1].headers["idempotency-key"], "signup-usr_8f2k1-0002");
});

test("get encodes the id and response mode and exposes Retry-After", async () => {
  const { fetcher, calls } = fakeFetch([json(PENDING, { headers: { "retry-after": "3" } }), json(COMPLETE)]);
  const nr = client(fetcher, { baseUrl: "https://example.com" });
  const pending = await nr.assessments.get(PENDING.assessment_id, { responseMode: "detailed" });
  assert.equal(pending.meta.retryAfter, 3);
  assert.equal(calls[0].method, "GET");
  assert.equal(calls[0].url, `https://example.com/v1/assessments/${PENDING.assessment_id}?response_mode=detailed`);
  const complete = await nr.assessments.get({ assessmentId: COMPLETE.assessment_id });
  assert.equal(complete.status, "complete");
  assert.equal(calls[1].url, `https://example.com/v1/assessments/${COMPLETE.assessment_id}`);
  assert.equal(calls[1].body, null);
});

test("query posts the account id in the body and pages to exhaustion", async () => {
  const pages = {
    undefined: { ...LIST, items: [COMPLETE], next_cursor: "cursor-two" },
    "cursor-two": { ...LIST, items: [PENDING], next_cursor: "cursor-three" },
    "cursor-three": { ...LIST, items: [COMPLETE], next_cursor: undefined },
  };
  const { fetcher, calls } = fakeFetch((call) => json(pages[call.body.cursor]));
  const nr = client(fetcher, { baseUrl: "https://example.com" });
  const page = await nr.assessments.query({ accountId: "usr_8f2k1", limit: 10, responseMode: "detailed" });
  assert.equal(calls[0].url, "https://example.com/v1/assessments/query");
  assert.deepEqual(calls[0].body, { account_id: "usr_8f2k1", limit: 10, response_mode: "detailed" });
  assert.equal(page.items.length, 1);
  assert.equal(page.nextCursor, "cursor-two");
  assert.equal(page.hasMore, true);
  assert.equal(page.retentionDays, LIST.retention_days);
  assert.equal(page.meta.requestId, "a".repeat(32));
  const seen = [];
  for await (const assessment of page) seen.push(assessment.assessmentId);
  assert.deepEqual(seen, [COMPLETE.assessment_id, PENDING.assessment_id, COMPLETE.assessment_id]);
  assert.equal(calls.length, 3);
  assert.equal(calls[1].body.cursor, "cursor-two");
  assert.equal(calls[2].body.cursor, "cursor-three");
  const second = await page.next();
  assert.equal(second.items[0].assessmentId, PENDING.assessment_id);
  const last = await second.next();
  assert.equal(last.hasMore, false);
  assert.equal(last.nextCursor, undefined);
  assert.equal(await last.next(), null);
  assert.equal(calls.length, 5, "next() after the walk fetches again; pages are not cached");
});

test("recordOutcome posts under its Idempotency-Key in both call shapes", async () => {
  const { fetcher, calls } = fakeFetch([json(OUTCOME, { status: 202 }), json(OUTCOME, { status: 202 })]);
  const nr = client(fetcher, { baseUrl: "https://example.com" });
  const receipt = await nr.assessments.recordOutcome(
    COMPLETE.assessment_id,
    { outcome: "chargeback", observedAt: "2026-10-20T10:00:00Z", externalRef: "case-42", notes: "Disputed" },
    { idempotencyKey: "outcome-usr_8f2k1-0001" },
  );
  assert.equal(receipt.outcome, OUTCOME.outcome);
  assert.equal(receipt.receivedAt, OUTCOME.received_at);
  assert.equal(calls[0].url, `https://example.com/v1/assessments/${COMPLETE.assessment_id}/outcomes`);
  assert.equal(calls[0].headers["idempotency-key"], "outcome-usr_8f2k1-0001");
  assert.deepEqual(calls[0].body, { outcome: "chargeback", observed_at: "2026-10-20T10:00:00Z", external_ref: "case-42", notes: "Disputed" });
  await nr.assessments.recordOutcome({ assessmentId: COMPLETE.assessment_id, body: { outcome: "legitimate" } });
  assert.match(calls[1].headers["idempotency-key"], UUID);
  assert.deepEqual(calls[1].body, { outcome: "legitimate" });
});

test("keys.rotate posts the overlap and returns the new key once", async () => {
  const { fetcher, calls } = fakeFetch([json(ROTATION, { status: 201 })]);
  const nr = client(fetcher, { baseUrl: "https://example.com" });
  const rotation = await nr.keys.rotate({ overlapSeconds: 3600 });
  assert.equal(rotation.key, ROTATION.key);
  assert.equal(rotation.previousKeyExpiresAt, ROTATION.previous_key_expires_at);
  assert.equal(calls[0].url, "https://example.com/v1/keys/rotate");
  assert.deepEqual(calls[0].body, { overlap_seconds: 3600 });
  assert.equal(calls[0].headers["idempotency-key"], undefined);
});

test("webhookEndpoints registers, lists, rotates, tests and deletes, and retries none of the writes", async () => {
  const created = fixture("valid/webhook-endpoint-created.json");
  const listed = fixture("valid/webhook-endpoint-list.json");
  const rotated = fixture("valid/webhook-key-rotation.json");
  const sent = fixture("valid/webhook-test-verification.json");
  const id = created.endpoint.endpoint_id;
  const { fetcher, calls } = fakeFetch([
    json(created, { status: 201 }),
    json(listed),
    json(rotated, { status: 201 }),
    json(sent, { status: 202 }),
    new Response(null, { status: 204, headers: { "x-request-id": "b".repeat(32), "cache-control": "no-store" } }),
    problem(503, "service_unavailable", {}, { "retry-after": "1" }),
  ]);
  const nr = client(fetcher, { baseUrl: "https://example.com" });
  const endpoint = await nr.webhookEndpoints.create({ url: "https://hooks.example.com/noresponse" });
  assert.equal(endpoint.signingSecret.secret, created.signing_secret.secret);
  assert.equal(endpoint.endpoint.state, "unverified");
  const all = await nr.webhookEndpoints.list();
  assert.equal(all.items[0].signingKeys.length, 2);
  const rotation = await nr.webhookEndpoints.rotateSigningKey(id);
  assert.equal(rotation.previousKeyId, rotated.previous_key_id);
  const test = await nr.webhookEndpoints.sendTestEvent(id, "endpoint.verification");
  assert.equal(test.verified, true);
  assert.equal(test.deliveryId, sent.delivery_id);
  const deleted = await nr.webhookEndpoints.delete(id);
  assert.equal(deleted.requestId, "b".repeat(32));
  await assert.rejects(nr.webhookEndpoints.sendTestEvent(id, "assessment.updated"));
  assert.deepEqual(calls.map((c) => `${c.method} ${c.url}`), [
    "POST https://example.com/v1/webhooks",
    "GET https://example.com/v1/webhooks",
    `POST https://example.com/v1/webhooks/${id}/rotate`,
    `POST https://example.com/v1/webhooks/${id}/test`,
    `DELETE https://example.com/v1/webhooks/${id}`,
    `POST https://example.com/v1/webhooks/${id}/test`,
  ]);
  assert.deepEqual(calls[0].body, { url: "https://hooks.example.com/noresponse" });
  assert.deepEqual(calls[2].body, {});
  assert.deepEqual(calls[3].body, { event: "endpoint.verification" });
});

test("integrations create, list, rotate and delete send the contract shapes", async () => {
  const id = INTEGRATION_AUTH0.integration_id;
  const { fetcher, calls } = fakeFetch([
    json(INTEGRATION_AUTH0, { status: 201 }),
    json(INTEGRATION_LIST),
    json(INTEGRATION_ROTATED),
    new Response(null, { status: 204, headers: { "x-request-id": "c".repeat(32) } }),
  ]);
  const nr = client(fetcher, { baseUrl: "https://example.com" });

  const created = await nr.integrations.create({ platform: "auth0", hookPoints: ["post_login"] });
  assert.equal(created.integrationId, id);
  assert.equal(created.secret, INTEGRATION_AUTH0.secret);
  assert.equal(created.meta.requestId, "a".repeat(32));
  assert.equal(calls[0].method, "POST");
  assert.equal(calls[0].url, "https://example.com/v1/integrations");
  assert.deepEqual(calls[0].body, { platform: "auth0", hook_points: ["post_login"] });
  assert.equal(calls[0].headers["idempotency-key"], undefined);

  const listed = await nr.integrations.list();
  assert.equal(listed.items.length, INTEGRATION_LIST.items.length);
  assert.equal(listed.items[1].platform, "workos");
  assert.equal(listed.items[0].secret, undefined);
  assert.equal(calls[1].method, "GET");
  assert.equal(calls[1].url, "https://example.com/v1/integrations");

  const rotated = await nr.integrations.rotate(id);
  assert.equal(rotated.secret, INTEGRATION_ROTATED.secret);
  assert.equal(rotated.previousSecretExpiresAt, INTEGRATION_ROTATED.previous_secret_expires_at);
  assert.equal(calls[2].method, "POST");
  assert.equal(calls[2].url, `https://example.com/v1/integrations/${id}/rotate`);
  assert.deepEqual(calls[2].body, {});

  const deleted = await nr.integrations.delete(id);
  assert.equal(deleted.meta.requestId, "c".repeat(32));
  assert.equal(calls[3].method, "DELETE");
  assert.equal(calls[3].url, `https://example.com/v1/integrations/${id}`);
});

test("integrations create and rotate are never retried", async () => {
  const { fetcher, calls } = fakeFetch(() => problem(503, "service_unavailable", {}, { "retry-after": "1" }));
  const nr = client(fetcher);
  await assert.rejects(nr.integrations.create({ platform: "workos", signingSecret: "wos_action_secret_k3Yx8pQ2mN7vR4tW" }), APIStatusError);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].body.signing_secret, "wos_action_secret_k3Yx8pQ2mN7vR4tW");
  await assert.rejects(nr.integrations.rotate(INTEGRATION_AUTH0.integration_id, {}), APIStatusError);
  assert.equal(calls.length, 2);
});

test("every status maps to its error class with the problem fields", async () => {
  const cases = [
    [400, "invalid_request", BadRequestError],
    [401, "unauthorized", AuthenticationError],
    [403, "tenant_forbidden", PermissionDeniedError],
    [404, "not_found", NotFoundError],
    [409, "idempotency_key_reused", ConflictError],
    [413, "payload_too_large", APIStatusError],
    [415, "unsupported_media_type", APIStatusError],
    [422, "invalid_request", APIStatusError],
    [500, "internal", APIStatusError],
  ];
  for (const [status, code, Class] of cases) {
    const extra = status === 400 ? { invalid_params: [{ field: "identifiers", reason: "required" }] } : {};
    const { fetcher } = fakeFetch([problem(status, code, extra)]);
    const nr = client(fetcher, { retryConfig: { strategy: "none" } });
    await assert.rejects(nr.assessments.get(COMPLETE.assessment_id), (error) => {
      assert.ok(error instanceof Class, `${status} should be ${Class.name}, got ${error.constructor.name}: ${error.message}`);
      assert.ok(error instanceof NoResponseError);
      assert.equal(error.status, status);
      assert.equal(error.statusCode, status);
      assert.equal(error.code, code);
      assert.equal(error.type, `https://docs.noresponse.org/problems/${code}`);
      assert.equal(error.title, "Problem");
      assert.equal(error.detail, `detail for ${code}`);
      assert.equal(error.requestId, "b".repeat(32));
      assert.equal(error.retryAfter, null);
      if (status === 400) assert.deepEqual(error.invalidParams, [{ field: "identifiers", reason: "required" }]);
      assert.match(error.message, new RegExp(code));
      return true;
    });
  }
});

test("a non-JSON error body still yields a typed error with the request id from the header", async () => {
  const { fetcher } = fakeFetch([new Response("bad gateway", { status: 502, headers: { "x-request-id": "c".repeat(32) } })]);
  const nr = client(fetcher, { retryConfig: { strategy: "none" } });
  await assert.rejects(nr.assessments.get(COMPLETE.assessment_id), (error) => {
    assert.ok(error instanceof APIStatusError);
    assert.equal(error.status, 502);
    assert.equal(error.code, null);
    assert.equal(error.detail, null);
    assert.equal(error.requestId, "c".repeat(32));
    assert.equal(error.body, "bad gateway");
    return true;
  });
});

test("a non-JSON 2xx body is an invalid_response error", async () => {
  const { fetcher } = fakeFetch([new Response("<html>", { status: 200, headers: { "content-type": "text/html" } })]);
  const nr = client(fetcher);
  await assert.rejects(nr.assessments.get(COMPLETE.assessment_id), (error) => {
    assert.ok(error instanceof NoResponseError, error.constructor.name);
    assert.equal(error.status, 200);
    assert.equal(error.code, "invalid_response");
    return true;
  });
  const { fetcher: broken } = fakeFetch([json({ unexpected: true })]);
  await assert.rejects(client(broken).assessments.get(COMPLETE.assessment_id), (error) => {
    assert.ok(error instanceof ResponseValidationError, error.constructor.name);
    assert.equal(error.code, "invalid_response");
    return true;
  });
});

test("503 is retried after Retry-After with the same Idempotency-Key, and 429 exposes retryAfter", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const { fetcher, calls } = fakeFetch([problem(503, "service_unavailable", {}, { "retry-after": "2" }), json(PENDING, { status: 202, headers: { "retry-after": "1" } })]);
  const nr = client(fetcher);
  const result = await drive(t.mock.timers, nr.assessments.create(REQUEST), [2000]);
  assert.equal(result.status, "pending");
  assert.equal(calls.length, 2);
  assert.match(calls[0].headers["idempotency-key"], UUID);
  assert.equal(calls[0].headers["idempotency-key"], calls[1].headers["idempotency-key"]);

  const { fetcher: limited } = fakeFetch(() => problem(429, "rate_limited", {}, { "retry-after": "7" }));
  const exhausted = client(limited, { retryConfig: { strategy: "none" } });
  await assert.rejects(exhausted.assessments.create(REQUEST), (error) => {
    assert.ok(error instanceof RateLimitError);
    assert.equal(error.retryAfter, 7);
    assert.equal(error.code, "rate_limited");
    return true;
  });
});

test("a hostile Retry-After is capped at 8 seconds and 409 is never retried", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const { fetcher, calls } = fakeFetch([problem(503, "service_unavailable", {}, { "retry-after": "3600" }), json(COMPLETE)]);
  const nr = client(fetcher);
  const promise = nr.assessments.create(REQUEST);
  await flush();
  t.mock.timers.tick(7999);
  await flush();
  assert.equal(calls.length, 1, "must still be sleeping at 7999 ms");
  t.mock.timers.tick(1);
  const result = await promise;
  assert.equal(result.status, "complete");
  assert.equal(calls.length, 2);

  const { fetcher: conflict, calls: conflictCalls } = fakeFetch(() => problem(409, "idempotency_key_reused"));
  await assert.rejects(client(conflict).assessments.create(REQUEST), ConflictError);
  assert.equal(conflictCalls.length, 1);
});

test("408 and connection errors are retried; a timeout surfaces as APITimeoutError", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const { fetcher, calls } = fakeFetch([new TypeError("fetch failed"), problem(408, "timeout"), json(COMPLETE)]);
  const result = await drive(t.mock.timers, client(fetcher).assessments.get(COMPLETE.assessment_id), [1500, 2500]);
  assert.equal(result.status, "complete");
  assert.equal(calls.length, 3);
  t.mock.timers.reset();

  const never = (request) => new Promise((_, reject) => request.signal.addEventListener("abort", () => reject(request.signal.reason)));
  const slow = client(never, { timeoutMs: 20, retryConfig: { strategy: "none" } });
  // The request timeout's timer is unref'd (AbortSignal.timeout), and this
  // fetch holds no socket open, so keep the event loop alive until it fires.
  const keepAlive = setInterval(() => {}, 1000);
  await assert.rejects(slow.assessments.get(COMPLETE.assessment_id), (error) => {
    assert.ok(error instanceof APITimeoutError);
    assert.ok(error instanceof RequestTimeoutError);
    return true;
  }).finally(() => clearInterval(keepAlive));
  const { fetcher: down } = fakeFetch(() => new TypeError("fetch failed"));
  await assert.rejects(client(down, { retryConfig: { strategy: "none" } }).assessments.get(COMPLETE.assessment_id), (error) => {
    assert.ok(error instanceof APIConnectionError);
    assert.ok(error instanceof ConnectionError);
    return true;
  });
});

test("wait polls with Retry-After, floors at 1 s and gives up with APITimeoutError", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"] });
  const { fetcher, calls } = fakeFetch([
    json(PENDING, { status: 202, headers: { "retry-after": "2" } }),
    json(PENDING, { headers: { "retry-after": "2" } }),
    json(PENDING),
    json(COMPLETE),
  ]);
  const nr = client(fetcher, { baseUrl: "https://example.com" });
  const created = await nr.assessments.create(REQUEST);
  assert.equal(created.status, "pending");
  const result = await drive(t.mock.timers, nr.assessments.wait(created.assessmentId, { responseMode: "detailed" }), [2000, 1000]);
  assert.equal(result.status, "complete");
  assert.equal(calls.length, 4);
  assert.equal(calls[1].url, `https://example.com/v1/assessments/${PENDING.assessment_id}?response_mode=detailed`);

  const { fetcher: forever } = fakeFetch(() => json(PENDING, { headers: { "retry-after": "1" } }));
  const stuck = client(forever);
  const waiting = stuck.assessments.wait(PENDING.assessment_id, { timeoutMs: 2500 });
  const rejection = assert.rejects(waiting, (error) => {
    assert.ok(error instanceof APITimeoutError);
    assert.match(error.message, /Timed out after 2500 ms/);
    return true;
  });
  await drive(t.mock.timers, waiting.catch(() => {}), [1000, 1000, 500, 500]);
  await rejection;
});

test("debug logging shows method, URL, status and request id but never the key or a body", async () => {
  const lines = [];
  const logger = { log: (...args) => lines.push(args.map(String).join(" ")), group() {}, groupEnd() {} };
  const { fetcher } = fakeFetch([json(COMPLETE)]);
  await withEnv({ NORESPONSE_LOG: "debug" }, async () => {
    const nr = client(fetcher, { baseUrl: "https://example.com", logger });
    await nr.assessments.create(REQUEST);
  });
  const joined = lines.join("\n");
  assert.match(joined, /> Request: POST https:\/\/example\.com\/v1\/assessments/);
  assert.match(joined, /< Response: POST https:\/\/example\.com\/v1\/assessments/);
  assert.match(joined, /Status: 200/);
  assert.match(joined, /x-request-id: a{32}/);
  assert.ok(!joined.includes(KEY), "the API key must not be logged");
  assert.ok(!joined.toLowerCase().includes("authorization"), "no headers in logs");
  assert.ok(!joined.includes("jordan.lee"), "no bodies in logs");
});
