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
  return { fetcher, served: () => next, done: () => assert.equal(next, exchanges.length, "every exchange was requested") };
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

const VECTOR = (name) => VECTORS.cases.find((c) => c.name === name);
/** The case's account as an older read saw it: allow at an earlier version. */
function staleBody(vector) {
  const body = structuredClone(vector.exchanges[0].response.body);
  body.risk_version = 1;
  body.decisions_by_flow.login = "allow";
  return body;
}

test("withAccountLock covers the read, the provider change and the record", async () => {
  const vector = VECTOR("workos_restricted_allow_reinstates_when_opted_in");
  const http = transcript(vector.exchanges);
  const client = new NoResponse({ apiKey: VECTORS.api_key, baseUrl: VECTORS.api_base_url, fetch: http.fetcher });
  const provider = identityProvider(vector.provider, { token: VECTORS.provider_token, fetch: http.fetcher });
  const { raw, headers } = sign(vector.event);
  const seen = [];
  const result = await handleRiskChange(client, raw, headers, SECRETS, {
    now: VECTORS.now,
    provider,
    flows: vector.flows,
    getAccountState: () => ({ state: vector.state.state, userId: vector.state.user_id }),
    withAccountLock: async (accountId, enforce) => {
      seen.push(accountId, http.served());
      await enforce();
      seen.push(http.served());
    },
  });
  http.done();
  assert.deepEqual(seen, [vector.event.data.account.id, 0, vector.exchanges.length]);
  assert.deepEqual(result.enforcements.map((done) => done.action), ["unrestrict"]);
  assert.equal(result.event.id, vector.event.id);
});

test("under withAccountLock enforceAccount acts on the current risk, not the account it was given", async () => {
  const vector = VECTOR("restricted_account_records_none");
  const http = transcript([{ request: vector.exchanges[0].request, response: { ...vector.exchanges[0].response, body: staleBody(vector) } }, ...vector.exchanges]);
  const client = new NoResponse({ apiKey: VECTORS.api_key, baseUrl: VECTORS.api_base_url, fetch: http.fetcher });
  const stale = await client.accounts.get(vector.event.data.account.id);
  const provider = identityProvider(vector.provider, { token: VECTORS.provider_token, fetch: http.fetcher });
  const result = await enforceAccount(client, stale, {
    provider,
    flows: { login: { reinstate: true } },
    getAccountState: () => ({ state: "restricted" }),
    withAccountLock: async (_accountId, enforce) => enforce(),
  });
  http.done();
  assert.deepEqual(result.enforcements.map((done) => done.action), ["none"]);
});

test("a withAccountLock that does not run enforce fails", async () => {
  const client = { accounts: {} };
  await assert.rejects(
    enforceAccount(client, { id: "acct_7f3a9c" }, { provider: customProvider({}), getAccountState: () => null, withAccountLock: async () => {} }),
    /without running enforce/,
  );
});

test("overlapping allow and block: the lock keeps an old allow from lifting a newer restriction", async () => {
  // The finding's order: a delivery reads allow at version 1 and pauses before
  // it unrestricts. Block at version 2 then arrives, sees the restriction still
  // in place and needs no action. The old call must not undo it.
  const run = async (locked) => {
    const risk = { id: "acct_1", riskVersion: 1, decisionsByFlow: { accountCreation: "allow", login: "allow", purchase: "allow" } };
    const store = { state: "restricted" };
    const restrictedInProvider = { value: true };
    const client = {
      accounts: {
        get: async () => structuredClone(risk),
        recordEnforcement: async () => {},
      },
    };
    let release;
    const paused = new Promise((resolve) => { release = resolve; });
    let reachedProvider;
    const atProvider = new Promise((resolve) => { reachedProvider = resolve; });
    const provider = customProvider({
      unrestrict: async () => {
        reachedProvider();
        await paused;
        restrictedInProvider.value = false;
      },
      restrict: async () => { restrictedInProvider.value = true; },
      revoke_sessions: async () => {},
    });
    let tail = Promise.resolve();
    const withAccountLock = locked
      ? (accountId, enforce) => {
          const held = tail.then(async () => {
            const result = await enforce();
            if (result.enforcements.some((done) => done.action === "unrestrict")) store.state = "active";
          });
          tail = held;
          return held;
        }
      : undefined;
    const options = { provider, flows: { login: { reinstate: true } }, getAccountState: () => ({ state: store.state }), ...(withAccountLock ? { withAccountLock } : {}) };
    const older = enforceAccount(client, structuredClone(risk), options);
    await atProvider;
    risk.riskVersion = 2;
    risk.decisionsByFlow.login = "block";
    const newer = enforceAccount(client, structuredClone(risk), options);
    if (locked) {
      release();
    } else {
      await newer;
      release();
    }
    await Promise.all([older, newer]);
    return restrictedInProvider.value;
  };
  assert.equal(await run(false), false, "without the lock the old allow wins, which is why the guide requires one");
  assert.equal(await run(true), true, "with the lock the block holds");
});
