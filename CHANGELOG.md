# Changelog

## 3.0.2

No changes detected.

## 3.0.1

No changes detected.

## 3.0.0

* `sdk.assessments.create()`: 
  *  `request.body` **Changed** (Breaking ⚠️)
  *  `response` **Changed** (Breaking ⚠️)
* `sdk.assessments.get()`:  `response` **Changed** (Breaking ⚠️)

## 2.0.36

* `sdk.assessments.delete()`: **Added**

## 2.0.35

No changes detected.

## 2.0.34

No changes detected.

## 2.0.33

No changes detected.

## 2.0.32

* `sdk.accounts.delete()`: **Added**

## 2.0.31

* `sdk.assessments.create()`: 
  *  `request.body` **Changed**

## 2.0.30

No changes detected.

## 2.0.29

* `sdk.webhookEndpoints.listDeliveries()`: **Added**
* `sdk.webhookEndpoints.replayDelivery()`: **Added**

## 2.0.28

No changes detected.

## 2.0.27

No changes detected.

## 2.0.26

No changes detected.

## 2.0.25

* `sdk.assessments.create()`:  `response.risk.reasons[].code.enum(testScenario)` **Added**
* `sdk.assessments.get()`:  `response.risk.reasons[].code.enum(testScenario)` **Added**
* `sdk.assessments.query()`:  `response.items[].risk.reasons[].code.enum(testScenario)` **Added**
* `sdk.accounts.get()`:  `response.risk.reasons[].code.enum(testScenario)` **Added**
* `sdk.accounts.listAssessments()`:  `response.items[].risk.reasons[].code.enum(testScenario)` **Added**

## 2.0.24

No changes detected.

## 2.0.23

No changes detected.

## 2.0.22

No changes detected.

## 2.0.21

No changes detected.

## 2.0.20

* `sdk.accounts.get()`: **Added**
* `sdk.accounts.listAssessments()`: **Added**

## 2.0.19

No changes detected.

## 2.0.18

No changes detected.

## 2.0.17

No changes detected.

## 2.0.16

* `sdk.assessments.create()`:  `response.authContext` **Added**
* `sdk.assessments.get()`:  `response.authContext` **Added**
* `sdk.assessments.query()`:  `response.items[].authContext` **Added**

## 2.0.15

No changes detected.

## 2.0.14

* `sdk.webhookEndpoints.list()`: **Added**
* `sdk.webhookEndpoints.create()`: **Added**
* `sdk.webhookEndpoints.delete()`: **Added**
* `sdk.webhookEndpoints.rotateSigningKey()`: **Added**
* `sdk.webhookEndpoints.sendTestEvent()`: **Added**
* `sdk.assessments.create()`:  `error.code` **Changed**
* `sdk.assessments.get()`:  `error.code` **Changed**
* `sdk.assessments.recordOutcome()`:  `error.code` **Changed**
* `sdk.assessments.query()`:  `error.code` **Changed**
* `sdk.keys.rotate()`:  `error.code` **Changed**
* `sdk.integrations.create()`:  `error.code` **Changed**
* `sdk.integrations.list()`:  `error.code` **Changed**
* `sdk.integrations.delete()`:  `error.code` **Changed**
* `sdk.integrations.rotate()`:  `error.code` **Changed**

## 2.0.13

* `sdk.integrations.create()`: **Added**
* `sdk.integrations.list()`: **Added**
* `sdk.integrations.delete()`: **Added**
* `sdk.integrations.rotate()`: **Added**
* `sdk.assessments.create()`:  `error.code.enum(tooManyIntegrations)` **Added**
* `sdk.assessments.get()`:  `error.code.enum(tooManyIntegrations)` **Added**
* `sdk.assessments.recordOutcome()`:  `error.code.enum(tooManyIntegrations)` **Added**
* `sdk.assessments.query()`:  `error.code.enum(tooManyIntegrations)` **Added**
* `sdk.keys.rotate()`: 
  *  `response.scopes[].enum(integrations)` **Added**
  *  `error.code.enum(tooManyIntegrations)` **Added**

## 2.0.12

* `sdk.assessments.create()`: 
  *  `request.body.issuedCredential` **Added**
  *  `response.risk` **Changed**
* `sdk.assessments.get()`:  `response.risk` **Changed**
* `sdk.assessments.query()`:  `response.items[].risk` **Changed**

## 2.0.11

No changes detected.

## 2.0.10

No changes detected.

## 2.0.9

* `sdk.assessments.create()`: 
  *  `request.body.authContext` **Changed**

## 2.0.8

No changes detected.

## 2.0.7

No changes detected.

## 2.0.6

No changes detected.

## 2.0.5

No changes detected.

## 2.0.4

No changes detected.

## 2.0.3

No changes detected.

## 2.0.2

API changes since the previous release are not listed: no earlier document was recorded.

All notable changes to `@noresponse/node`. The format follows Keep a Changelog and the package follows Semantic Versioning.

## 2.0.0

The client is now generated from the NoResponse OpenAPI document, with hand-written webhooks, auth adapters and wait helper. Every call site changes.

### Breaking changes

- Construction: `new NoResponse({ apiKey, baseUrl, timeoutMs, fetch, logger, retryConfig })`. `apiKey` defaults to `NORESPONSE_API_KEY` and `baseUrl` to `NORESPONSE_BASE_URL`, then `https://api.noresponse.org`; both options were required before and the environment was not read. The default timeout is 10 s (was 5 s). `maxRetries` and `retryBaseDelayMs` are replaced by `retryConfig`.
- Methods moved under resources: `assess()` is `assessments.create(params, options)`, `getAssessment()` is `assessments.get(id, options)`, `waitForAssessment()` is `assessments.wait(id, options)`, `queryAssessments()` is `assessments.query(params)` and `recordOutcome()` is `assessments.recordOutcome(id, params, options)`. `keys.rotate()` is new.
- Request bodies use the API's field names in camelCase: `create` takes `{ accountId, identifiers: { email, username, phone, name, ip }, policyContext: { flow, region }, requestId, deadlineMs, responseMode, clientContext, authContext }` instead of a flat object. Client-side checks of ids, the deadline, the outcome vocabulary and note lengths are gone; the API answers 400 with `invalidParams`.
- The idempotency key is an option (`{ idempotencyKey }`), is generated when omitted, and is reused on every retry of that call.
- Every model is camelCase (`assessmentId`, `assessmentVersion`, `expiresAt`, `risk.reasons[].code`). Dates stay RFC 3339 strings.
- Returned objects carry `meta` (`requestId`, `retryAfter`, `location`, `idempotentReplayed`); `query` returns a page with `items`, `hasMore`, `next()` and an async iterator over every item.
- Errors: one class per status (`BadRequestError`, `AuthenticationError`, `PermissionDeniedError`, `NotFoundError`, `ConflictError`, `RateLimitError`, `APIStatusError`), all extending `NoResponseError`, each with `status`, `type`, `title`, `detail`, `code`, `requestId`, `retryAfter` and `invalidParams`. Connection failures and timeouts are `APIConnectionError` and `APITimeoutError` instead of raw `TypeError` and `DOMException`. `retryable` is replaced by `isRetryable(error)`.
- Retries cover connection errors, 408, 429 and every 5xx (before: network errors, 429 and 503), with jittered backoff from 500 ms to 8 s for at most 30 s in all. `Retry-After` is honoured and capped at 8 s; before, a `Retry-After: 3600` made the client sleep for an hour.
- `wait` polls no faster than once a second and throws `APITimeoutError` (was a plain `Error`).
- Webhooks: `verifyWebhook(rawBody, headerPairs, secrets, nowSeconds)` is `constructEvent(payload, headers, secrets, { toleranceSeconds, now })`, which also accepts a string body, a Fetch `Headers` object and Node headers. `webhookAssessment()` is gone: an `assessment.updated` event's `data` is already the typed assessment, and `isExpiredEvent()` picks out the terminal expiry event. `webhookVerificationResponse()` is `verificationResponse()`. Failures throw `WebhookVerificationError` with a `code`.
- Auth adapters return and accept camelCase (`sessionCreatedAt`, `emailVerified`, `mfa.ageSeconds`); their outputs are unchanged on the wire.
- Packaging: dual ESM and CommonJS builds, `zod` as a runtime dependency, package metadata pointing at https://docs.noresponse.org and https://github.com/noresponsehq/node.

### Added

- `keys.rotate({ overlapSeconds })`.
- `nr.webhooks` and `NoResponse.webhooks` with `constructEvent` and `verificationResponse`.
- `NORESPONSE_LOG=debug` and the `logger` option: one line per request and response, without headers or bodies.
- A `User-Agent` of `noresponse-node/<version> (<runtime>)` on every request.
- Standalone per-operation functions under `@noresponse/node/funcs/*` and a `NoResponseCore` client for them.
- Node 20 and 22 in CI.

## 1.0.1

Hand-written client: `assess`, `getAssessment`, `waitForAssessment`, `queryAssessments`, `recordOutcome`, `verifyWebhook` and the four auth adapters.
