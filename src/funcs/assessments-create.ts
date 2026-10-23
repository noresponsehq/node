import * as z from "zod/v4-mini";
import { NoResponseCore } from "../core.js";
import { encodeJSON, encodeSimple } from "../lib/encodings.js";
import { matchStatusCode } from "../lib/http.js";
import * as M from "../lib/matchers.js";
import { compactMap } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { RequestOptions } from "../lib/sdks.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { pathToFunc } from "../lib/url.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/http-client-errors.js";
import * as errors from "../models/errors/index.js";
import { NoResponseError } from "../models/errors/no-response-error.js";
import { ResponseValidationError } from "../models/errors/response-validation-error.js";
import { SDKValidationError } from "../models/errors/sdk-validation-error.js";
import * as operations from "../models/operations/index.js";
import { APICall, APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";

/**
 * Assess identifiers for a signup or gateway decision.
 *
 * @remarks
 * Returns within the deadline (3000 ms at most) with a complete, partial or pending assessment: 200 carries complete or partial, 202 carries pending with Location and Retry-After. A pending answer has no recommendation; apply your own fallback for pending, 429, 503 or a timeout. risk.block says when your block threshold was reached. Requires the assess scope. Idempotency-Key is required and is bound to the body for 24 hours: the same key with the same body replays the latest assessment with Idempotent-Replayed: true and starts no new work; the same key with a different body answers 409 idempotency_key_reused. response_mode defaults to standard; detailed needs the detailed scope.
 */
export function assessmentsCreate(
  client: NoResponseCore,
  request: operations.CreateAssessmentRequest,
  options?: RequestOptions,
): APIPromise<
  Result<
    operations.CreateAssessmentResponse,
    | errors.BadRequestError
    | errors.AuthenticationError
    | errors.PermissionDeniedError
    | errors.NotFoundError
    | errors.ConflictError
    | errors.RateLimitError
    | NoResponseError
    | ResponseValidationError
    | ConnectionError
    | RequestAbortedError
    | RequestTimeoutError
    | InvalidRequestError
    | UnexpectedClientError
    | SDKValidationError
  >
> {
  return new APIPromise($do(
    client,
    request,
    options,
  ));
}

async function $do(
  client: NoResponseCore,
  request: operations.CreateAssessmentRequest,
  options?: RequestOptions,
): Promise<
  [
    Result<
      operations.CreateAssessmentResponse,
      | errors.BadRequestError
      | errors.AuthenticationError
      | errors.PermissionDeniedError
      | errors.NotFoundError
      | errors.ConflictError
      | errors.RateLimitError
      | NoResponseError
      | ResponseValidationError
      | ConnectionError
      | RequestAbortedError
      | RequestTimeoutError
      | InvalidRequestError
      | UnexpectedClientError
      | SDKValidationError
    >,
    APICall,
  ]
> {
  const parsed = safeParse(
    request,
    (value) =>
      z.parse(operations.CreateAssessmentRequest$outboundSchema, value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.body, { explode: true });

  const path = pathToFunc("/v1/assessments")();

  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
    "Idempotency-Key": encodeSimple(
      "Idempotency-Key",
      payload["Idempotency-Key"],
      { explode: false, charEncoding: "none" },
    ),
  }));

  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "createAssessment",
    oAuth2Scopes: null,

    resolvedSecurity: requestSecurity,

    securitySource: client._options.apiKey,
    retryConfig: options?.retries
      || client._options.retryConfig
      || {
        strategy: "backoff",
        backoff: {
          initialInterval: 500,
          maxInterval: 8000,
          exponent: 2,
          maxElapsedTime: 30000,
        },
        retryConnectionErrors: true,
      }
      || { strategy: "none" },
    retryCodes: options?.retryCodes || ["408", "429", "5XX"],
  };

  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path: path,
    headers: headers,
    body: body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;

  const doResult = await client._do(req, {
    context,
    isErrorStatusCode: (statusCode: number) =>
      matchStatusCode({ status: statusCode } as Response, ["4XX", "5XX"]),
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes,
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;

  const responseFields = {
    HttpMeta: { Response: response, Request: req },
  };

  const [result] = await M.match<
    operations.CreateAssessmentResponse,
    | errors.BadRequestError
    | errors.AuthenticationError
    | errors.PermissionDeniedError
    | errors.NotFoundError
    | errors.ConflictError
    | errors.RateLimitError
    | NoResponseError
    | ResponseValidationError
    | ConnectionError
    | RequestAbortedError
    | RequestTimeoutError
    | InvalidRequestError
    | UnexpectedClientError
    | SDKValidationError
  >(
    M.json([200, 202], operations.CreateAssessmentResponse$inboundSchema, {
      hdrs: true,
      key: "Result",
    }),
    M.jsonErr(400, errors.BadRequestError$inboundSchema, {
      ctype: "application/problem+json",
      hdrs: true,
    }),
    M.jsonErr(401, errors.AuthenticationError$inboundSchema, {
      ctype: "application/problem+json",
      hdrs: true,
    }),
    M.jsonErr(403, errors.PermissionDeniedError$inboundSchema, {
      ctype: "application/problem+json",
      hdrs: true,
    }),
    M.jsonErr(404, errors.NotFoundError$inboundSchema, {
      ctype: "application/problem+json",
      hdrs: true,
    }),
    M.jsonErr(409, errors.ConflictError$inboundSchema, {
      ctype: "application/problem+json",
      hdrs: true,
    }),
    M.jsonErr(429, errors.RateLimitError$inboundSchema, {
      ctype: "application/problem+json",
      hdrs: true,
    }),
    M.fail("4XX"),
    M.fail("5XX"),
  )(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }

  return [result, { status: "complete", request: req, response }];
}
