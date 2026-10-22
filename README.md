# @noresponse/node

The NoResponse client for Node.js. It assesses a signup or gateway event, polls a pending assessment, pages through an account's history, records what you later learned, rotates your API key and verifies webhooks.

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
  identifiers: { email: "jordan.lee@example.com", name: "Jordan Lee", ip: "81.2.69.160" },
});

if (assessment.status === "pending") {
  // No recommendation yet. Apply your fallback now, then wait or take the webhook.
  const settled = await nr.assessments.wait(assessment.assessmentId);
  console.log(settled.risk?.recommendation);
} else {
  console.log(assessment.risk?.recommendation); // allow, step_up or review
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
    identifiers: { email: "jordan.lee@example.com" },          // email, username or phone; name and ip refine the match
    policyContext: { flow: "signup", region: "AU" },           // signup, login, recovery or profile_change
    clientContext: { timezone: "Australia/Sydney", platform: "web", formDurationMs: 1800 },
    authContext: fromClerk(claims, { sessionCreatedAt }),      // see Auth adapters
    responseMode: "standard",                                  // detailed adds signals and risk.details (detailed scope)
  },
  { idempotencyKey: "signup-usr_8f2k1-0001" },
);
```

The answer is the assessment whether the API answered 200 (complete or partial) or 202 (pending). `status` is `complete`, `partial` or `pending`; `risk.recommendation` is `allow`, `step_up` or `review` and is absent while pending.

The idempotency key is generated (a UUID) when you leave it out and is sent again on every retry of that call. Pass your own to make a retry of the same signup from your side replay the same assessment: the API answers the latest version with `meta.idempotentReplayed` true and starts no new work. The same key with a different body answers 409.

### Get and wait

```ts
const latest = await nr.assessments.get(assessment.assessmentId);
const settled = await nr.assessments.wait(assessment.assessmentId, { timeoutMs: 30_000 });
```

`wait` polls `get` until the status is no longer pending, sleeping the server's `Retry-After` (at least one second) between polls, and throws `APITimeoutError` at `timeoutMs` (default 30 s). Pass `responseMode: "detailed"` to either.

### Query an account's history

```ts
const page = await nr.assessments.query({ accountId: "usr_8f2k1", limit: 20 });
page.items;        // newest first, each at its latest version
page.hasMore;      // true when another page exists
await page.next(); // the next page, or null

for await (const item of page) {
  // every assessment across every page
}
```

### Record an outcome

```ts
const receipt = await nr.assessments.recordOutcome(assessment.assessmentId, {
  outcome: "chargeback", // confirmed_abuse, account_takeover, chargeback, false_positive, legitimate or unknown
  observedAt: "2026-10-20T10:00:00Z",
  externalRef: "case-42",
});
```

Outcomes take an idempotency key the same way `create` does.

## Keys

```ts
const rotation = await nr.keys.rotate({ overlapSeconds: 3600 });
rotation.key;                  // the new key, shown once
rotation.previousKeyExpiresAt; // when the key that signed the request stops working
```

The default overlap is 24 hours (minimum 60 seconds, maximum 7 days). Rotate with the new key next time.

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

## Webhooks

Verify the exact bytes you received, then act on the typed event. `secrets` maps each `whk_` key id we give you to its secret; hold both during a rotation.

```ts
import { constructEvent, isExpiredEvent, verificationResponse, WebhookVerificationError } from "@noresponse/node";

// Express: app.post("/webhooks/noresponse", express.raw({ type: "*/*" }), handler)
async function handler(req, res) {
  let event;
  try {
    event = constructEvent(req.body, req.headers, { [process.env.NORESPONSE_WEBHOOK_KEY_ID]: process.env.NORESPONSE_WEBHOOK_SECRET });
  } catch (error) {
    if (error instanceof WebhookVerificationError) return res.status(400).end();
    throw error;
  }
  if (event.type === "endpoint.verification") return res.json(verificationResponse(event));
  if (isExpiredEvent(event)) {
    forget(event.data.assessmentId); // GET now answers 404
  } else if (isNewer(event.data)) {  // keep the highest assessmentVersion per assessment
    apply(event.data);              // the full assessment, as assessments.get returns it
  }
  res.status(204).end();
}
```

`constructEvent(payload, headers, secrets, { toleranceSeconds })` takes the raw body (a `Buffer`, `Uint8Array` or the exact text), any header object (Fetch `Headers`, Node `IncomingHttpHeaders`, a plain object or entries) and refuses a repeated signature header, a delivery older than 300 seconds, an unknown key id or a bad signature with a `WebhookVerificationError` whose `code` says which. Deliveries are at least once: deduplicate on `event.id`. The same functions are on `NoResponse.webhooks` and `nr.webhooks`. This module uses `node:crypto`.

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
