import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { createServer } from "node:http";
import test from "node:test";
import {
  auth0Actions,
  clerkActions,
  DEFAULT_LATE_RESULT_POLICY,
  handleLateResult,
  lateResultAction,
  logOnlyActions,
  ProviderActionError,
  WebhookVerificationError,
  workosActions,
} from "../dist/esm/index.js";
import { fixture } from "./helpers.mjs";

const SECRET = "late-result-secret";
const KEY = "whk_sdktest01";
const NOW = 1791968402;
const secrets = { [KEY]: SECRET };
const REVIEW = fixture("valid/assessment-phone-uncovered-complete.json");
const STEP_UP = fixture("valid/assessment-complete.json");
const PENDING = fixture("valid/assessment-pending.json");
const EXPIRED = fixture("valid/webhook-assessment-expired.json");

function delivery(data, accountId, extra = {}) {
  const body = { id: "evt_01JA2ZB4N5P6Q7R8S9T0VWXYZ2", type: "assessment.updated", created_at: "2026-10-18T11:00:04Z", ...extra, data: accountId ? { ...data, account_id: accountId } : data };
  const raw = Buffer.from(JSON.stringify(body), "utf8");
  const stamp = String(NOW);
  const digest = createHmac("sha256", SECRET).update(stamp).update(".").update(raw).digest("hex");
  return { raw, headers: { "NR-Webhook-Id": body.id, "NR-Webhook-Timestamp": stamp, "NR-Webhook-Key-Id": KEY, "NR-Webhook-Signature": "v1=" + digest } };
}

/** A local HTTP server standing in for a provider's admin API. It records each request and answers from `route`. */
async function mockProvider(route) {
  const calls = [];
  const server = createServer((req, res) => {
    let text = "";
    req.on("data", (chunk) => (text += chunk));
    req.on("end", () => {
      const url = new URL(req.url, "http://127.0.0.1");
      const call = { method: req.method, path: url.pathname, query: Object.fromEntries(url.searchParams), auth: req.headers.authorization, body: text ? JSON.parse(text) : undefined };
      calls.push(call);
      const [status, body] = route(call) ?? [404, { error: "not found" }];
      res.writeHead(status, { "content-type": "application/json" });
      res.end(body === undefined ? "" : JSON.stringify(body));
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  return { url, calls, close: () => new Promise((resolve) => server.close(resolve)) };
}

test("the default policy revokes on review and does nothing on allow, step_up, pending or expiry", () => {
  const ev = (data) => ({ id: "evt_x", type: "assessment.updated", createdAt: "2026-10-18T11:00:04Z", data });
  assert.equal(lateResultAction(ev({ status: "complete", recommendation: "review" })), "revoke_sessions");
  assert.equal(lateResultAction(ev({ status: "complete", recommendation: "step_up" })), "none");
  assert.equal(lateResultAction(ev({ status: "partial", recommendation: "allow" })), "none");
  assert.equal(lateResultAction(ev({ status: "pending" })), "none");
  assert.equal(lateResultAction(ev({ status: "expired", changeReason: "expired" })), "none");
  assert.equal(lateResultAction({ id: "evt_x", type: "endpoint.verification", createdAt: "x", data: {} }), "none");
  assert.equal(lateResultAction({ id: "evt_x", type: "account.deleted", createdAt: "x", test: false, data: { accountId: "acct_1", assessmentsDeleted: 1, deletedAt: "x" } }), "none");
  assert.equal(lateResultAction(ev({ status: "complete", recommendation: "step_up" }), { step_up: "ban" }), "ban");
  assert.equal(lateResultAction(ev({ status: "complete", recommendation: "review" }), { step_up: "ban" }), "none");
  assert.throws(() => lateResultAction(ev({ status: "complete", recommendation: "review" }), { review: "delete" }), TypeError);
  assert.deepEqual(DEFAULT_LATE_RESULT_POLICY, { allow: "none", step_up: "none", review: "revoke_sessions" });
});

test("Clerk: review revokes each active session, and a ban policy bans the user", async () => {
  const mock = await mockProvider((c) => {
    if (c.method === "GET" && c.path === "/v1/sessions") {
      return [200, c.query.offset === "0" ? [{ id: "sess_1", status: "active" }, { id: "sess_2", status: "active" }] : []];
    }
    if (c.method === "POST" && /^\/v1\/sessions\/sess_\d\/revoke$/.test(c.path)) return [200, { id: c.path.split("/")[3], status: "revoked" }];
    if (c.method === "POST" && c.path === "/v1/users/user_2EXAMPLE/ban") return [200, { id: "user_2EXAMPLE", banned: true }];
  });
  try {
    const clerk = clerkActions({ secretKey: "sk_test_mock", baseUrl: mock.url + "/v1" });
    const { raw, headers } = delivery(REVIEW, "user_2EXAMPLE");
    const result = await handleLateResult(raw, headers, secrets, clerk, { now: NOW });
    assert.equal(result.action, "revoke_sessions");
    assert.equal(result.userId, "user_2EXAMPLE");
    assert.equal(result.event.data.assessmentId, REVIEW.assessment_id);
    assert.deepEqual(
      mock.calls.map((c) => `${c.method} ${c.path}`),
      ["GET /v1/sessions", "POST /v1/sessions/sess_1/revoke", "POST /v1/sessions/sess_2/revoke"],
    );
    assert.deepEqual(mock.calls[0].query, { user_id: "user_2EXAMPLE", status: "active", limit: "100", offset: "0" });
    assert.ok(mock.calls.every((c) => c.auth === "Bearer sk_test_mock"));

    mock.calls.length = 0;
    const banned = await handleLateResult(raw, headers, secrets, clerk, { now: NOW, policy: { review: "ban" } });
    assert.equal(banned.action, "ban");
    assert.deepEqual(mock.calls.map((c) => `${c.method} ${c.path}`), ["POST /v1/users/user_2EXAMPLE/ban"]);
  } finally {
    await mock.close();
  }
});

test("WorkOS: revoke pages through the sessions, and ban revokes then deletes the user", async () => {
  const mock = await mockProvider((c) => {
    if (c.method === "GET" && c.path === "/user_management/users/user_01WORKOS/sessions") {
      return c.query.after === undefined
        ? [200, { object: "list", data: [{ id: "session_A", status: "active" }, { id: "session_X", status: "revoked" }], list_metadata: { before: null, after: "session_X" } }]
        : [200, { object: "list", data: [{ id: "session_B", status: "active" }], list_metadata: { before: "session_B", after: null } }];
    }
    if (c.method === "POST" && c.path === "/user_management/sessions/revoke") return [200, { id: c.body.session_id, status: "revoked" }];
    if (c.method === "DELETE" && c.path === "/user_management/users/user_01WORKOS") return [202, undefined];
  });
  try {
    const workos = workosActions({ apiKey: "sk_test_workos", baseUrl: mock.url });
    const { raw, headers } = delivery(STEP_UP, "acct_7f3a9c");
    const result = await handleLateResult(raw, headers, secrets, workos, {
      now: NOW,
      policy: { step_up: "ban" },
      userId: (accountId) => (accountId === "acct_7f3a9c" ? "user_01WORKOS" : null),
    });
    assert.equal(result.action, "ban");
    assert.equal(result.userId, "user_01WORKOS");
    assert.deepEqual(
      mock.calls.map((c) => `${c.method} ${c.path} ${JSON.stringify(c.body ?? c.query)}`),
      [
        'GET /user_management/users/user_01WORKOS/sessions {"limit":"100"}',
        'GET /user_management/users/user_01WORKOS/sessions {"limit":"100","after":"session_X"}',
        'POST /user_management/sessions/revoke {"session_id":"session_A"}',
        'POST /user_management/sessions/revoke {"session_id":"session_B"}',
        "DELETE /user_management/users/user_01WORKOS {}",
      ],
    );
    assert.ok(mock.calls.every((c) => c.auth === "Bearer sk_test_workos"));
  } finally {
    await mock.close();
  }
});

test("Auth0: review deletes sessions and refresh tokens; ban blocks first; the | in the id is escaped", async () => {
  const id = "auth0|64abc0de1234567890abcdef";
  const escaped = "auth0%7C64abc0de1234567890abcdef";
  const mock = await mockProvider((c) => {
    if (c.path === `/api/v2/users/${escaped}/sessions` && c.method === "DELETE") return [202, undefined];
    if (c.path === `/api/v2/users/${escaped}/refresh-tokens` && c.method === "DELETE") return [202, undefined];
    if (c.path === `/api/v2/users/${escaped}` && c.method === "PATCH") return [200, { user_id: id, blocked: c.body.blocked }];
  });
  try {
    const auth0 = auth0Actions({ baseUrl: mock.url + "/api/v2", token: "mgmt_token" });
    const { raw, headers } = delivery(REVIEW, id);
    const result = await handleLateResult(raw, headers, secrets, auth0, { now: NOW });
    assert.equal(result.action, "revoke_sessions");
    assert.deepEqual(mock.calls.map((c) => `${c.method} ${c.path}`), [`DELETE /api/v2/users/${escaped}/sessions`, `DELETE /api/v2/users/${escaped}/refresh-tokens`]);

    mock.calls.length = 0;
    await handleLateResult(raw, headers, secrets, auth0, { now: NOW, policy: { review: "ban" } });
    assert.deepEqual(
      mock.calls.map((c) => `${c.method} ${c.path} ${JSON.stringify(c.body ?? null)}`),
      [`PATCH /api/v2/users/${escaped} {"blocked":true}`, `DELETE /api/v2/users/${escaped}/sessions null`, `DELETE /api/v2/users/${escaped}/refresh-tokens null`],
    );
    assert.ok(mock.calls.every((c) => c.auth === "Bearer mgmt_token"));
  } finally {
    await mock.close();
  }
});

/**
 * An Auth0 tenant on a plan without the sessions API, as a Free tenant answers:
 * both bulk endpoints refuse with 403 feature_not_enabled, while
 * /device-credentials and PATCH /users/{id} work. It keeps the user's refresh
 * tokens and blocked flag, so a repeated delivery sees what the first left.
 */
function auth0WithoutSessionsApi(escaped, { refreshTokensApi = false } = {}) {
  const state = { blocked: false, credentials: [{ id: "dcr_a", type: "refresh_token" }, { id: "dcr_b", type: "refresh_token" }, { id: "dcr_r", type: "rotating_refresh_token" }] };
  const refused = [403, { statusCode: 403, error: "Forbidden", message: "This feature is not enabled for this tenant.", errorCode: "feature_not_enabled" }];
  const route = (c) => {
    if (c.method === "DELETE" && c.path === `/api/v2/users/${escaped}/sessions`) return refused;
    if (c.method === "DELETE" && c.path === `/api/v2/users/${escaped}/refresh-tokens`) {
      if (!refreshTokensApi) return refused;
      state.credentials = [];
      return [202, undefined];
    }
    if (c.method === "PATCH" && c.path === `/api/v2/users/${escaped}`) {
      state.blocked = c.body.blocked === true;
      return [200, { blocked: state.blocked }];
    }
    if (c.method === "GET" && c.path === "/api/v2/device-credentials") return [200, state.credentials.filter((d) => d.type === c.query.type)];
    if (c.method === "DELETE" && c.path.startsWith("/api/v2/device-credentials/")) {
      const id = decodeURIComponent(c.path.slice("/api/v2/device-credentials/".length));
      if (!state.credentials.some((d) => d.id === id)) return [404, { errorCode: "inexistent_device_credential" }];
      state.credentials = state.credentials.filter((d) => d.id !== id);
      return [204, undefined];
    }
  };
  return { state, route };
}

test("Auth0 without the sessions API: revoke blocks the user, deletes refresh tokens as device credentials and reports ban", async () => {
  const id = "auth0|64abc0de1234567890abcdef";
  const escaped = "auth0%7C64abc0de1234567890abcdef";
  const tenant = auth0WithoutSessionsApi(escaped);
  const mock = await mockProvider(tenant.route);
  try {
    const auth0 = auth0Actions({ baseUrl: mock.url + "/api/v2", token: "mgmt_token" });
    const { raw, headers } = delivery(REVIEW, id);
    const result = await handleLateResult(raw, headers, secrets, auth0, { now: NOW });
    assert.equal(result.action, "ban");
    assert.equal(result.userId, id);
    assert.equal(tenant.state.blocked, true);
    assert.deepEqual(tenant.state.credentials, []);
    assert.deepEqual(
      mock.calls.map((c) => `${c.method} ${c.path}${c.query.type ? " " + c.query.type : ""}`),
      [
        `DELETE /api/v2/users/${escaped}/sessions`,
        `PATCH /api/v2/users/${escaped}`,
        `DELETE /api/v2/users/${escaped}/refresh-tokens`,
        "GET /api/v2/device-credentials refresh_token",
        "GET /api/v2/device-credentials rotating_refresh_token",
        "DELETE /api/v2/device-credentials/dcr_a",
        "DELETE /api/v2/device-credentials/dcr_b",
        "DELETE /api/v2/device-credentials/dcr_r",
      ],
    );
    assert.ok(mock.calls.filter((c) => c.path === "/api/v2/device-credentials").every((c) => c.query.user_id === id));

    // The same delivery again: still blocked, nothing left to delete, same report.
    mock.calls.length = 0;
    assert.equal((await handleLateResult(raw, headers, secrets, auth0, { now: NOW })).action, "ban");
    assert.equal(tenant.state.blocked, true);
    assert.ok(!mock.calls.some((c) => c.method === "DELETE" && c.path.startsWith("/api/v2/device-credentials/")));

    // ban blocks first, and the plan refusing the sessions endpoint is no failure.
    tenant.state.blocked = false;
    tenant.state.credentials.push({ id: "dcr_c", type: "refresh_token" });
    mock.calls.length = 0;
    assert.equal((await handleLateResult(raw, headers, secrets, auth0, { now: NOW, policy: { review: "ban" } })).action, "ban");
    assert.equal(mock.calls[0].method, "PATCH");
    assert.equal(tenant.state.blocked, true);
    assert.deepEqual(tenant.state.credentials, []);

    // Called directly, revokeSessions takes the same fallback.
    tenant.state.blocked = false;
    await auth0.revokeSessions(id);
    assert.equal(tenant.state.blocked, true);
  } finally {
    await mock.close();
  }
});

test("Auth0 with the refresh-token endpoint but no sessions API still blocks; a scope refusal never falls back", async () => {
  const escaped = "auth0%7Cabc";
  const tenant = auth0WithoutSessionsApi(escaped, { refreshTokensApi: true });
  const mock = await mockProvider(tenant.route);
  try {
    const auth0 = auth0Actions({ baseUrl: mock.url + "/api/v2", token: "mgmt_token" });
    const { raw, headers } = delivery(REVIEW, "auth0|abc");
    assert.equal((await handleLateResult(raw, headers, secrets, auth0, { now: NOW })).action, "ban");
    assert.equal(tenant.state.blocked, true);
    assert.ok(!mock.calls.some((c) => c.path === "/api/v2/device-credentials"));
  } finally {
    await mock.close();
  }

  const scoped = await mockProvider((c) =>
    c.method === "DELETE" ? [403, { statusCode: 403, error: "Forbidden", message: "Insufficient scope, expected any of: delete:sessions", errorCode: "insufficient_scope" }] : [200, {}],
  );
  try {
    const auth0 = auth0Actions({ baseUrl: scoped.url + "/api/v2", token: "mgmt_token" });
    const { raw, headers } = delivery(REVIEW, "auth0|abc");
    await assert.rejects(handleLateResult(raw, headers, secrets, auth0, { now: NOW }), (e) => e instanceof ProviderActionError && e.status === 403 && e.code === "insufficient_scope");
    assert.deepEqual(scoped.calls.map((c) => c.method), ["DELETE"]);
  } finally {
    await scoped.close();
  }
});

test("a provider with no act reports the action asked for", async () => {
  const done = [];
  const custom = { name: "custom", revokeSessions: async (u) => void done.push(`revoke ${u}`), ban: async (u) => void done.push(`ban ${u}`) };
  const { raw, headers } = delivery(REVIEW, "u_1");
  assert.equal((await handleLateResult(raw, headers, secrets, custom, { now: NOW })).action, "revoke_sessions");
  assert.equal((await handleLateResult(raw, headers, secrets, custom, { now: NOW, policy: { review: "ban" } })).action, "ban");
  assert.deepEqual(done, ["revoke u_1", "ban u_1"]);
});

test("an unverified, quiet or unmapped event makes no provider call, and a provider refusal throws", async () => {
  const mock = await mockProvider((c) => (c.method === "DELETE" ? [403, { error: "insufficient_scope" }] : undefined));
  try {
    const auth0 = auth0Actions({ baseUrl: mock.url + "/api/v2", token: "mgmt_token" });
    const { raw, headers } = delivery(REVIEW, "auth0|abc");
    await assert.rejects(handleLateResult(raw, headers, { [KEY]: "wrong" }, auth0, { now: NOW }), (e) => e instanceof WebhookVerificationError && e.code === "invalid_signature");
    await assert.rejects(handleLateResult(Buffer.concat([raw, Buffer.from(" ")]), headers, secrets, auth0, { now: NOW }), WebhookVerificationError);
    await assert.rejects(handleLateResult(raw, headers, secrets, auth0, { now: NOW + 301 }), (e) => e.code === "invalid_timestamp");
    for (const data of [STEP_UP, PENDING, EXPIRED.data]) {
      const d = delivery(data);
      assert.equal((await handleLateResult(d.raw, d.headers, secrets, auth0, { now: NOW })).action, "none");
    }
    assert.equal((await handleLateResult(raw, headers, secrets, auth0, { now: NOW, userId: () => null })).action, "none");
    assert.equal(mock.calls.length, 0);
    await assert.rejects(handleLateResult(raw, headers, secrets, auth0, { now: NOW }), (e) => e instanceof ProviderActionError && e.status === 403 && e.provider === "auth0");
    assert.equal(mock.calls.length, 1);
  } finally {
    await mock.close();
  }
});

test("a webhook test event acts on nothing, whatever the policy and user id", async () => {
  const mock = await mockProvider(() => [200, {}]);
  try {
    const workos = workosActions({ apiKey: "sk_test_workos", baseUrl: mock.url });
    const { raw, headers } = delivery(STEP_UP, "acct_7f3a9c", { test: true });
    let resolved = 0;
    const result = await handleLateResult(raw, headers, secrets, workos, {
      now: NOW,
      policy: { allow: "ban", step_up: "ban", review: "ban" },
      userId: () => (resolved++, "user_01WORKOS"),
    });
    assert.equal(result.event.test, true);
    assert.equal(result.action, "none");
    assert.equal(result.userId, undefined);
    assert.equal(resolved, 0);
    assert.equal(mock.calls.length, 0);
    assert.equal(lateResultAction(result.event, { step_up: "ban" }), "none");
  } finally {
    await mock.close();
  }
});

test("a repeated delivery is safe: a provider 404 for a gone user or session counts as done", async () => {
  // Every user and session is already gone, as after a first WorkOS ban deleted the user.
  const mock = await mockProvider((c) => [404, { error: "not_found", path: c.path }]);
  try {
    const { raw, headers } = delivery(REVIEW, "user_gone");
    const providers = [
      workosActions({ apiKey: "sk_test_workos", baseUrl: mock.url }),
      clerkActions({ secretKey: "sk_test_mock", baseUrl: mock.url + "/v1" }),
      auth0Actions({ baseUrl: mock.url + "/api/v2", token: "mgmt_token" }),
    ];
    for (const provider of providers) {
      for (const review of ["ban", "revoke_sessions"]) {
        for (let attempt = 0; attempt < 2; attempt++) {
          const result = await handleLateResult(raw, headers, secrets, provider, { now: NOW, policy: { review } });
          assert.equal(result.action, review, `${provider.name} ${review} attempt ${attempt}`);
        }
      }
    }
    assert.ok(mock.calls.length > 0);
  } finally {
    await mock.close();
  }
});

test("a repeated Clerk revoke tolerates a session that went between list and revoke; other refusals still throw", async () => {
  const mock = await mockProvider((c) => {
    if (c.method === "GET" && c.path === "/v1/sessions") return [200, [{ id: "sess_1", status: "active" }]];
    if (c.method === "POST" && c.path === "/v1/sessions/sess_1/revoke") return [404, { errors: [{ code: "resource_not_found" }] }];
    if (c.method === "POST" && c.path === "/v1/users/user_2EXAMPLE/ban") return [500, { error: "boom" }];
  });
  try {
    const clerk = clerkActions({ secretKey: "sk_test_mock", baseUrl: mock.url + "/v1" });
    const { raw, headers } = delivery(REVIEW, "user_2EXAMPLE");
    assert.equal((await handleLateResult(raw, headers, secrets, clerk, { now: NOW })).action, "revoke_sessions");
    await assert.rejects(handleLateResult(raw, headers, secrets, clerk, { now: NOW, policy: { review: "ban" } }), (e) => e instanceof ProviderActionError && e.status === 500);
  } finally {
    await mock.close();
  }
});

test("the log-only provider logs what it would revoke or ban and calls nothing", async (t) => {
  t.mock.method(globalThis, "fetch", () => {
    throw new Error("the log-only provider must not call out");
  });
  const lines = [];
  const logOnly = logOnlyActions({ log: (message, details) => lines.push({ message, details }) });
  assert.equal(logOnly.name, "log_only");
  const { raw, headers } = delivery(REVIEW, "usr_8f2k1");
  const revoked = await handleLateResult(raw, headers, secrets, logOnly, { now: NOW });
  assert.deepEqual([revoked.action, revoked.userId], ["revoke_sessions", "usr_8f2k1"]);
  const banned = await handleLateResult(raw, headers, secrets, logOnly, { now: NOW, policy: { review: "ban" } });
  assert.equal(banned.action, "ban");
  assert.deepEqual(lines, [
    { message: "NoResponse late result (log only): would revoke every session of user usr_8f2k1", details: { action: "revoke_sessions", userId: "usr_8f2k1" } },
    { message: "NoResponse late result (log only): would ban user usr_8f2k1 and end their sessions", details: { action: "ban", userId: "usr_8f2k1" } },
  ]);
  const test = delivery(REVIEW, "usr_8f2k1", { test: true });
  assert.equal((await handleLateResult(test.raw, test.headers, secrets, logOnly, { now: NOW })).action, "none");
  assert.equal(lines.length, 2);
  await assert.rejects(logOnly.ban(""), TypeError);
  assert.equal(globalThis.fetch.mock.callCount(), 0);

  const info = t.mock.method(console, "info", () => {});
  await logOnlyActions().revokeSessions("usr_8f2k1");
  assert.deepEqual(info.mock.calls.map((call) => call.arguments), [["NoResponse late result (log only): would revoke every session of user usr_8f2k1"]]);
});
