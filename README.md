<img src="https://raw.githubusercontent.com/noresponsehq/.github/main/profile/sdk-header.png" alt="NoResponse" width="100%">

# @noresponse/node

The NoResponse client for Node.js. It assesses an account creation, login or purchase, polls a pending assessment, pages through an account's history, records what you later learned, rotates your API key and verifies webhooks.

Node.js 20 or later. ESM and CommonJS. TypeScript types included. The client is generated from the NoResponse OpenAPI document; webhooks, auth adapters and the wait helper are hand-written.

```sh
npm install @noresponse/node
```

## Quick start

```ts
import { NoResponse } from "@noresponse/node";

const nr = new NoResponse(); // reads NORESPONSE_API_KEY, or new NoResponse("nrk_...")

const assessment = await nr.assessments.create({
  accountId: "usr_8f2k1",
  flow: "account_creation",
  identifiers: { email: "jordan.lee@example.com", name: "Jordan Lee", ip: "81.2.69.160" },
});

if (assessment.account) {
  console.log(assessment.account.risk.decision); // allow, step_up, review or block
} else {
  // The account's first assessment is still pending. Apply your fallback now, then wait or take the webhook.
  const settled = await nr.assessments.wait(assessment.id);
  console.log(settled.account?.risk.decision);
}
```

Keep the API key on your server. The client throws at construction without one.

## Configuration

```ts
const nr = new NoResponse({
  apiKey: process.env.NORESPONSE_API_KEY, // default
  baseUrl: "https://api.noresponse.org",   // default; or NORESPONSE_BASE_URL
  timeoutMs: 10_000,                       // per request
  fetch,                                   // your own fetch, for example with a proxy agent
  logger: console,                         // one line per request and response
  retryConfig: { strategy: "none" },       // override the retry policy
});
```

| Option | Default | Notes |
|---|---|---|
| `apiKey` | `NORESPONSE_API_KEY` | A string, or a function returning a promise of one. |
| `baseUrl` | `NORESPONSE_BASE_URL`, then `https://api.noresponse.org` | HTTPS, except localhost. |
| `timeoutMs` | 10 000 | Per request. Also settable per call. |
| `fetch` | global fetch | Any `fetch` implementation. |
| `logger` | `console` when `NORESPONSE_LOG=debug` | Receives method, URL, status and request id. Headers and bodies are not logged. |
| `retryConfig` | see [Retries](#retries) | |

Every method takes request options as its last argument: `{ timeoutMs, signal, headers, retries, serverURL }`.

## Assessments

### Create

```ts
const assessment = await nr.assessments.create(
  {
    accountId: "usr_8f2k1",                                    // your opaque account id
    flow: "account_creation",                                            // account_creation, login or purchase
    depth: "full",                                             // quick or full; full for account_creation and purchase, quick for login by default
    identifiers: { email: "jordan.lee@example.com" },          // email, username or phone; name and ip refine the match
    policyContext: { region: "AU" },
    clientContext: { timezone: "Australia/Sydney", platform: "web", formDurationMs: 1800 },
    authContext: fromClerk(claims, { sessionCreatedAt }),      // see Auth adapters
    responseMode: "standard",                                  // detailed adds detail.signals and detail.risk.details (detailed scope)
  },
  { idempotencyKey: "account-usr_8f2k1-0001" },
);
```

The answer is the assessment whether the API answered 200 (complete or partial) or 202 (pending). `status` is `complete`, `partial` or `pending`. Act on `account.risk.decision`: `allow`, `step_up`, `review` or `block`, the account's current decision for this flow. `account` is absent while the account's first assessment is pending. `detail` holds this assessment's own facts: `detail.risk`, `detail.recommendation`, `detail.signals`, `detail.assessmentVersion` and, while pending, `detail.assessmentUrl`.

The idempotency key is generated (a UUID) when you leave it out and is sent again on every retry of that call. Pass your own to make a retry of the same signup from your side replay the same assessment: the API answers the latest version with `meta.idempotentReplayed` true and starts no new work. The same key with a different body answers 409.

### Get and wait

```ts
const latest = await nr.assessments.get(assessment.id);
const settled = await nr.assessments.wait(assessment.id, { timeoutMs: 30_000 });
```

`wait` polls `get` until the status is `complete`, sleeping the server's `Retry-After` (at least one second) between polls. At `timeoutMs` (default 30 s) it returns the latest answer if that is `partial`, with its status still `partial`, and throws `APITimeoutError` if the assessment is still `pending`. Pass `responseMode: "detailed"` to either.

### Query an account's history

```ts
const page = await nr.assessments.query({ accountId: "usr_8f2k1", limit: 20 });
page.items;        // assessment details, newest first, each at its latest version
page.hasMore;      // true when another page exists
await page.next(); // the next page, or null

for await (const item of page) {
  // every assessment across every page
}
```

### Read an account's current risk

An account is the `accountId` you send with your assessments. It holds one current risk: the risk of its latest assessment with a decision. Every assessment updates it.

```ts
const account = await nr.accounts.get("usr_8f2k1");
account.risk.score;              // 0 (safe) to 100 (risky)
account.risk.decision;           // allow, step_up, review or block
account.decisionsByFlow.login;   // a decision for account_creation, login and purchase
account.assessmentId;            // the assessment the risk comes from

const history = await nr.accounts.listAssessments("usr_8f2k1", { limit: 20 });
for await (const item of history) {
  // the same pages as assessments.query, newest first
}

// An erasure request from your user: every assessment of the account goes.
const erased = await nr.accounts.delete("usr_8f2k1");
erased.assessmentsDeleted;       // 0 on a repeat
```

Both calls need the `history` scope. An account with no decided assessment throws `NotFoundError`. `listAssessments` puts the account id in the URL; use `assessments.query` to keep it in the request body.

### Record an outcome

```ts
const receipt = await nr.assessments.recordOutcome(assessment.id, {
  outcome: "chargeback", // confirmed_abuse, account_takeover, chargeback, false_positive, legitimate or unknown
  observedAt: "2026-10-20T10:00:00Z",
  externalRef: "case-42",
});
```

Outcomes take an idempotency key the same way `create` does.

### Delete one assessment

```ts
const removed = await nr.assessments.delete(assessment.assessmentId);
removed.account.currentAssessmentId; // the assessment the account's risk now comes from; absent when none is left
```

It needs the `history` scope. Afterwards `assessments.get` of it throws `NotFoundError`, and so does a repeat. To erase a whole account, use `accounts.delete`.

## Keys

```ts
const rotation = await nr.keys.rotate({ overlapSeconds: 3600 });
rotation.key;                  // the new key, shown once
rotation.previousKeyExpiresAt; // when the key that signed the request stops working
```

The default overlap is 24 hours (minimum 60 seconds, maximum 7 days). Rotate with the new key next time.

## Integrations

A hosted integration is a WorkOS or Auth0 Action that NoResponse answers, so sign-ups and sign-ins are scored with no server of your own. These calls need a key with the `integrations` scope.

```ts
const integration = await nr.integrations.create({ platform: "auth0" });
integration.url;    // point the Auth0 Action at this
integration.secret; // the Action's shared secret, shown once

await nr.integrations.create({ platform: "workos", signingSecret: process.env.WORKOS_ACTIONS_SECRET! });
const { items } = await nr.integrations.list(); // no secrets
const rotated = await nr.integrations.rotate(integration.integrationId); // Auth0: new secret; WorkOS: pass { signingSecret }
await nr.integrations.delete(integration.integrationId);
```

`create` and `rotate` are not idempotent and are never retried. The replaced secret is accepted until `previousSecretExpiresAt`.

## Response metadata

Every returned object carries `meta`:

```ts
assessment.meta.requestId;          // X-Request-ID, to quote when you contact us
assessment.meta.retryAfter;         // seconds, when the API sent Retry-After
assessment.meta.location;           // the polling path of a pending assessment
assessment.meta.idempotentReplayed; // true when the answer replays an earlier request
```

## Errors

Every API error extends `NoResponseError` and carries `status`, `type`, `title`, `detail`, `code`, `requestId`, `retryAfter` and, on a 400, `invalidParams` (the offending fields).

| Class | When |
|---|---|
| `BadRequestError` | 400: the body or a header is malformed; see `invalidParams` and `code` |
| `AuthenticationError` | 401: missing, malformed, revoked or expired key |
| `PermissionDeniedError` | 403: the key lacks the operation's scope |
| `NotFoundError` | 404: unknown, expired or foreign assessment |
| `ConflictError` | 409: idempotency key reused with a different body, or a key already rotating |
| `RateLimitError` | 429: see `retryAfter` |
| `APIStatusError` | any other 4xx or 5xx, including 503, and a 2xx the client could not read (`code` is `invalid_response`) |
| `APIConnectionError` | DNS, TLS or connection failure (also exported as `ConnectionError`) |
| `APITimeoutError` | the request or a `wait` timed out (also exported as `RequestTimeoutError`) |

```ts
import { NoResponseError, RateLimitError, APIConnectionError, APITimeoutError } from "@noresponse/node";

try {
  await nr.assessments.create(params);
} catch (error) {
  if (error instanceof RateLimitError) schedule(error.retryAfter);
  else if (error instanceof APIConnectionError || error instanceof APITimeoutError) fallback();
  else if (error instanceof NoResponseError) log(error.status, error.code, error.requestId);
  else throw error;
}
```

The transport errors extend `HTTPClientError`, not `NoResponseError`.

## Retries

Connection errors, 408, 429 and every 5xx are retried with exponential backoff (500 ms, then 2 s, 4.5 s, up to 8 s between attempts, with jitter) for at most 30 s in all. When the API sends `Retry-After`, the client sleeps that long instead, capped at 8 s. A POST sends the same `Idempotency-Key` on every attempt, so a retried create or outcome is recorded once. 409 and other 4xx are not retried.

Override per client with `retryConfig`, or per call with `{ retries }`:

```ts
await nr.assessments.create(params, { retries: { strategy: "none" } });
```

## Issued keys

When your platform issues an API key to the new account, send only its hash, as `issued_credential.sha256`; the key itself never leaves your backend.

```ts
import { hashIssuedCredential } from "@noresponse/node";
const sha256 = hashIssuedCredential(issuedKey); // 64 lower-case hex characters
```

## Key usage

Report each request made with an issued key, and NoResponse ties the key's usage back to the account it was issued to. A key used from 20 or more IP addresses, or 3 or more countries, within 24 hours puts `shared_api_key` in that account's risk. Keep one buffer per process in your API gateway and record every request; it needs a key with the `assess` scope.

```ts
const usage = nr.keyUsage.buffer(); // sends every 5 s, or once 100 facts are queued

app.use((req, res, next) => {
  usage.record({
    key: req.header("authorization")?.replace(/^Bearer /, ""), // hashed here; the key is not sent
    ip: req.ip,
    userAgent: req.header("user-agent"),
    model: req.body?.model,
  });
  next();
});

process.on("SIGTERM", async () => {
  await usage.close(); // sends what is queued
});
```

`record` does not block and does not throw. Pass `keySha256` instead of `key` when you already hold the hash, and `inputTokens`, `outputTokens` and `occurredAt` when you have them. Options: `batchSize` (default 100, at most 500), `flushIntervalMs` (default 5000; the timer does not keep the process alive), `maxQueue` (default 10 000; when full, the oldest fact is dropped), `sampleRate` (record a share of requests, such as 0.1), and `onError` (called when a batch fails after retries). `stats()` returns `{ queued, sent, dropped, failed, invalid }`. Each batch carries its own `Idempotency-Key`, sent again on every retry, so a retried batch is counted once. `nr.keyUsage.record({ events })` sends one batch yourself.

## Webhooks

Register your endpoint with a key that has the `webhooks` scope. The signing secret is shown only in this answer, so store it, then send the verification challenge:

```ts
const { endpoint, signingSecret } = await nr.webhookEndpoints.create({ url: "https://app.example.com/webhooks/noresponse" });
await secretStore.write(signingSecret.keyId, signingSecret.secret);
const check = await nr.webhookEndpoints.sendTestEvent(endpoint.endpointId, "endpoint.verification"); // check.verified
await nr.webhookEndpoints.sendTestEvent(endpoint.endpointId, "assessment.updated"); // event.test is true
```

`list()`, `rotateSigningKey(endpointId)` (the old key verifies for 7 more days) and `delete(endpointId)` manage it afterwards.

Verify the exact bytes you received, then act on the typed event. `secrets` maps each `whk_` key id to its secret; hold both during a rotation.

```ts
import { constructEvent, WebhookVerificationError } from "@noresponse/node";

// Express: app.post("/webhooks/noresponse", express.raw({ type: "*/*" }), handler)
async function handler(req, res) {
  let event;
  try {
    event = await constructEvent(req.body, req.headers, { [process.env.NORESPONSE_WEBHOOK_KEY_ID]: process.env.NORESPONSE_WEBHOOK_SECRET });
  } catch (error) {
    if (error instanceof WebhookVerificationError) return res.status(400).end();
    throw error;
  }
  if (event.type === "endpoint.verification") return res.json({ challenge: event.data.challenge });
  if (event.type === "account.deleted") {
    // You erased it with accounts.delete: drop what was created at or before deletedAt,
    // and ignore late updates of those assessments. A newer assessment of the account stays.
    forgetAccount(event.data.accountId, event.data.deletedAt);
    return res.status(204).end();
  }
  if (event.type === "workspace.deleted") {
    // The workspace is deleted: the last event this endpoint receives, once per environment.
    forgetEnvironment(event.data.environment);
    return res.status(204).end();
  }
  if (event.type === "webhook_endpoint.disabled") {
    // Another endpoint failed for 72 hours and is disabled until you verify it again.
    alertOps(event.data.endpointId, event.data.failingSince);
    return res.status(204).end();
  }
  if (event.type === "account.risk_changed") {
    // The one event to act on: a flow's decision changed, at data.account.riskVersion.
    // This verifier alone does not enforce it: use handleRiskChange (below) as this endpoint's receiver.
    return res.status(204).end();
  }
  if ("assessmentId" in event.data) {
    forget(event.data.assessmentId); // the terminal expiry notice: GET now answers 404
  }
  // Any other assessment.updated reports progress only: apply nothing.
  res.status(204).end();
}
```

`constructEvent(payload, headers, secrets, { toleranceSeconds })` returns a promise. It takes the raw body (a `Buffer`, `Uint8Array` or the exact text), any header object (Fetch `Headers`, Node `IncomingHttpHeaders`, a plain object or entries) and refuses a repeated signature header, a delivery older than 300 seconds, an unknown key id or a bad signature with a `WebhookVerificationError` whose `code` says which. Deliveries are at least once: deduplicate on `event.id`. The same function is on `NoResponse.webhooks` and `nr.webhooks`. It uses Web Crypto.

### Late enforcement

A decision can rise after you admitted the account, once a slow source settles. `account.risk_changed` wakes your handler; `handleRiskChange` verifies it, reads the account's current risk (the event's own copy is ignored), asks you where the account is in your flow, and enforces it through your identity provider:

```ts
import { handleRiskChange, identityProvider } from "@noresponse/node";

const clerk = identityProvider("clerk", { token: process.env.CLERK_SECRET_KEY! }); // or "workos", or "auth0" with domain
const result = await handleRiskChange(nr, rawBody, request.headers, secrets, {
  provider: clerk,
  getAccountState: async (account) => {
    const user = await users.find(account.id); // your store
    return user ? { state: user.state, userId: user.clerkId, enforcedRiskVersion: user.enforcedRiskVersion } : null;
  },
  flows: { login: { reinstate: true } }, // lift a restriction once login is allow again (off by default)
});
if (result.riskVersion !== undefined) await users.update(result.account!.id, { enforcedRiskVersion: result.riskVersion });
```

| State | Flow | Decision | Actions |
|---|---|---|---|
| `onboarding` | `account_creation` | `allow` | `activate` |
| `onboarding` | `account_creation` | `review`, `block` | `fail_onboarding`, `revoke_sessions` |
| `provisional` | `account_creation` | `allow` | `activate` |
| `provisional` | `account_creation` | `review`, `block` | `reject_activation`, `revoke_sessions` |
| `active` | `login` | `review` | `revoke_sessions` |
| `active` | `login` | `block` | `restrict`, `revoke_sessions` |
| `restricted` | `login` | `allow` | `unrestrict`, only with `reinstate` |

Nothing deletes a user. Clerk bans (and unbans), Auth0 sets `blocked`, and WorkOS, which has no block, writes `noresponse_state` to the user's metadata (gate sign-in on it) and revokes every session. On an Auth0 plan without the sessions API the revoke blocks the user too and reports `restrict`. Each action, or `none` when nothing is needed, is recorded with `accounts.recordEnforcement` at the `riskVersion` read, and `result.enforcements` lists them. A refused action is recorded as `failed` and throws `ProviderActionError`: answer 5xx so the delivery is retried. A test event, an erased account and an account at or below `enforcedRiskVersion` act on nothing (`result.skipped`). To catch up after dropped deliveries, pass each account of `nr.accounts.listChanged({ unenforced: true })` to `enforceAccount`. For your own user store, `customProvider({ restrict: async (userId) => ..., revoke_sessions: async (userId) => ... })` takes one function per action you support; an action without one is recorded as failed.

A held flow (workspace settings `admission: held`) answers `held` until its investigation completes or `hold_seconds` pass, and the handler records `none` for it. When the final decision arrives as `account.risk_changed`, an `onboarding` or `provisional` account fails onboarding or is refused activation on `review` or `block`. On `allow` the handler records `activate` (no provider call; a custom provider runs its own `activate`), so admit the account when the result's enforcements hold it. An account at `allow` that needs no change, such as an `active` one after a held login, is recorded as `none`. Either way the account leaves the unenforced list. See https://docs.noresponse.org/guides/late-results.

## Auth adapters

Map a session your backend has already verified into `authContext`:

```ts
import { fromClerk, fromWorkOS, fromAuth0, fromSupabase, fromFirebase, fromCognito, fromEntra, fromKeycloak, fromOry, fromOIDC } from "@noresponse/node";

const authContext = fromClerk(sessionClaims, {
  sessionCreatedAt: "2026-10-19T18:00:00Z",
  accountCreatedAt: user.createdAt,
  emailVerified: true,
});
```

Each adapter reads the standard claims (issuer, subject, audience, session and token ids, times), the provider's organisation, role and scope claims, and multi-factor evidence where the provider exposes it. Pass what the token leaves out as overrides. `fromSupabase` takes the claims of a Supabase access token verified with the legacy HS256 secret or the project JWKS. `fromFirebase` takes the decoded token from the Admin SDK `verifyIdToken`; it reads only Firebase's reserved claims, so a custom claim never changes the result. `fromCognito` takes a verified Cognito ID or access token and ignores claims a pre token generation Lambda adds. `fromEntra` takes a v1.0 or v2.0 Entra ID token or access token. `fromKeycloak` reads `amr` from the Authentication Method Reference mapper, so give your password and OTP executions the reference values `pwd` and `otp`. `fromOry` takes the session from `toSession` and needs your project URL as the `issuer` override; `fromOryOAuth2` takes an Ory OAuth2 ID token. `fromOIDC(provider, claims, overrides)` covers any other provider.

## Logging

Set `NORESPONSE_LOG=debug`, or pass `logger`, to get one line per request and response: method, URL, status and request id. The API key, other headers and bodies are kept out of the log.

## Standalone functions

Every operation is also a tree-shakeable function that returns a result object instead of throwing:

```ts
import { NoResponseCore } from "@noresponse/node";
import { assessmentsCreate } from "@noresponse/node/funcs/assessments-create.js";

const result = await assessmentsCreate(new NoResponseCore({ apiKey }), { idempotencyKey, body });
if (result.ok) console.log(result.value.result.status);
```

## Support

Documentation: https://docs.noresponse.org. Issues: https://github.com/noresponsehq/node/issues. Quote `meta.requestId` or `error.requestId` when you write to us.

Apache-2.0.
