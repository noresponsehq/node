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
 * Replay an audit delivery.
 *
 * @remarks
 * Replay a recorded delivery for the current audit subscription. Requires audit_manage. Source retention and the current action filter are checked again before sending. Expired or unsubscribed events are dropped.
 */
export function auditReplayStream(
  client: NoResponseCore,
  request: operations.ReplayAuditStreamRequest,
  options?: RequestOptions,
): APIPromise<
  Result<
    operations.ReplayAuditStreamResponse,
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
  request: operations.ReplayAuditStreamRequest,
  options?: RequestOptions,
): Promise<
  [
    Result<
      operations.ReplayAuditStreamResponse,
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
      z.parse(operations.ReplayAuditStreamRequest$outboundSchema, value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.body, { explode: true });

  const pathParams = {
    endpoint_id: encodeSimple("endpoint_id", payload.endpoint_id, {
      explode: false,
      charEncoding: "percent",
    }),
    environment: encodeSimple("environment", payload.environment, {
      explode: false,
      charEncoding: "percent",
    }),
    workspace_id: encodeSimple("workspace_id", payload.workspace_id, {
      explode: false,
      charEncoding: "percent",
    }),
  };
  const path = pathToFunc(
    "/v1/workspaces/{workspace_id}/audit_streams/{environment}/{endpoint_id}/replay",
  )(pathParams);

  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "application/json",
  }));

  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "replayAuditStream",
    oAuth2Scopes: null,

    resolvedSecurity: requestSecurity,

    securitySource: client._options.apiKey,
    retryConfig: options?.retries || { strategy: "none" },
    retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
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
    operations.ReplayAuditStreamResponse,
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
    M.json(200, operations.ReplayAuditStreamResponse$inboundSchema, {
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
