# Changelog

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
