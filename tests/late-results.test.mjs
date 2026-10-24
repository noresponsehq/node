// The shared late enforcement vectors through handleRiskChange, plus what the
// vectors cannot say in JSON: verification, the custom provider and the table's
// guarantees.
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import {
  NoResponse,
  ProviderActionError,
  WebhookVerificationError,
  customProvider,
  enforceAccount,
  handleRiskChange,
  identityProvider,
} from "../dist/esm/index.js";
import { fixture } from "./helpers.mjs";

const VECTORS = fixture("late-results-vectors.json");
const SECRETS = { [VECTORS.key_id]: VECTORS.secret_utf8 };

function sign(event) {
  const raw = JSON.stringify(event);
  const stamp = String(VECTORS.now);
  const signature = "v1=" + createHmac("sha256", VECTORS.secret_utf8).update(`${stamp}.${raw}`).digest("hex");
  const headers = { "NR-Webhook-Id": event.id, "NR-Webhook-Timestamp": stamp, "NR-Webhook-Key-Id": VECTORS.key_id, "NR-Webhook-Signature": signature };
  return { raw, headers };
}

/** Method, path and query as an order-free set of decoded pairs. */
function normalize(method, url) {
  const parsed = new URL(url);
  const query = [...parsed.searchParams.entries()].map(([k, v]) => `${k}=${v}`).sort();
  return `${method} ${parsed.origin}${parsed.pathname}?${query.join("&")}`;
}

/** A fetch that serves the case's exchanges in order and fails on anything else. */
function transcript(exchanges) {
  let next = 0;
  const fetcher = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    const text = await request.text();
    const expected = exchanges[next];
    const got = normalize(request.method, request.url);
    assert.ok(expected, `unexpected request ${got}`);
    assert.equal(got, normalize(expected.request.method, expected.request.url), `request ${next}`);
    if (expected.request.body !== undefined) assert.deepEqual(JSON.parse(text), expected.request.body, `body of request ${next}`);
    next++;
    const { status, headers = {}, body } = expected.response;
    return new Response(body === undefined || status === 204 ? null : JSON.stringify(body), { status, headers });
  };
  return { fetcher, done: () => assert.equal(next, exchanges.length, "every exchange was requested") };
}

for (const vector of VECTORS.cases) {
  test(`vector ${vector.name}`, async () => {
    const http = transcript(vector.exchanges);
    const client = new NoResponse({ apiKey: VECTORS.api_key, baseUrl: VECTORS.api_base_url, fetch: http.fetcher });
    const provider = identityProvider(vector.provider, { token: VECTORS.provider_token, domain: vector.domain, fetch: http.fetcher });
    const { raw, headers } = sign(vector.event);
    const options = {
      now: VECTORS.now,
      provider,
      flows: vector.flows,
      getAccountState: (account) => {
        assert.equal(account.id, vector.event.data.account.id);
        if (!vector.state) return null;
        return {
          state: vector.state.state,
          ...(vector.state.user_id ? { userId: vector.state.user_id } : {}),
          ...(vector.state.enforced_risk_version !== undefined ? { enforcedRiskVersion: vector.state.enforced_risk_version } : {}),
        };
      },
    };
    let result;
    let error;
    try {
      result = await handleRiskChange(client, raw, headers, SECRETS, options);
    } catch (thrown) {
      error = thrown;
    }
    http.done();
    if (vector.error) {
      assert.ok(error instanceof ProviderActionError, `expected ProviderActionError, got ${error}`);
      assert.deepEqual({ provider: error.provider, status: error.status, code: error.code }, vector.error);
      return;
    }
    if (error) throw error;
    assert.equal(result.skipped ?? null, vector.result.skipped);
    const enforcements = result.enforcements.map(({ flow, action, status, errorCode }) => ({ flow, action, status, ...(errorCode ? { error_code: errorCode } : {}) }));
    assert.deepEqual(enforcements, vector.result.enforcements);
  });
}

test("the vectors cover every provider, state and skip", () => {
  const providers = new Set(VECTORS.cases.map((c) => c.provider));
  assert.deepEqual([...providers].sort(), ["auth0", "clerk", "workos"]);
  const states = new Set(VECTORS.cases.map((c) => c.state?.state).filter(Boolean));
  assert.deepEqual([...states].sort(), ["active", "onboarding", "provisional", "rejected", "restricted"]);
  const skips = new Set(VECTORS.cases.map((c) => c.result.skipped).filter(Boolean));
  assert.deepEqual([...skips].sort(), ["account_gone", "already_enforced", "not_actionable", "unknown_user"]);
  const methods = VECTORS.cases.flatMap((c) => c.exchanges.map((e) => `${e.request.method} ${new URL(e.request.url).pathname}`));
  assert.ok(!methods.some((m) => /^DELETE .*\/users\/[^/]+$/.test(m)), "no vector deletes a user");
});

test("a delivery that fails verification reads and acts on nothing", async () => {
  const vector = VECTORS.cases[0];
  const http = transcript([]);
  const client = new NoResponse({ apiKey: VECTORS.api_key, baseUrl: VECTORS.api_base_url, fetch: http.fetcher });
  const { raw, headers } = sign(vector.event);
  const options = { now: VECTORS.now, provider: customProvider({}), getAccountState: () => assert.fail("not called") };
  await assert.rejects(handleRiskChange(client, raw + " ", headers, SECRETS, options), WebhookVerificationError);
  http.done();
});

test("a custom provider runs your functions and a missing one fails the action", async () => {
  const account = { id: "acct_7f3a9c", riskVersion: 9, decisionsByFlow: { accountCreation: "block", login: "block", purchase: "block" } };
  const recorded = [];
  const client = { accounts: { recordEnforcement: async (id, body) => recorded.push([id, body]) } };
  const ran = [];
  // A return value that is not a list of actions (a model, here) is no extra action.
  const provider = customProvider({ restrict: async (userId) => ({ restricted: ran.push(["restrict", userId]) > 0 }) });
  await assert.rejects(enforceAccount(client, account, { provider, getAccountState: () => ({ state: "active", userId: "u_1" }) }), TypeError);
  assert.deepEqual(ran, [["restrict", "u_1"]]);
  assert.deepEqual(recorded.map(([, body]) => [body.action, body.status, body.errorCode, body.provider]), [
    ["restrict", "applied", undefined, "custom"],
    ["revoke_sessions", "failed", "custom.error", "custom"],
  ]);
});

test("identityProvider needs its credentials", () => {
  assert.throws(() => identityProvider("clerk", {}), TypeError);
  assert.throws(() => identityProvider("auth0", { token: "t" }), TypeError);
  assert.throws(() => identityProvider("okta", { token: "t" }), TypeError);
});
