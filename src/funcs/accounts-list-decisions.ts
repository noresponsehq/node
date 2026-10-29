import * as z from "zod/v4-mini";
import { NoResponseCore } from "../core.js";
import { encodeFormQuery, encodeSimple } from "../lib/encodings.js";
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
import {
  createPageIterator,
  haltIterator,
  PageIterator,
  Paginator,
} from "../types/operations.js";

/**
 * Page through recorded account decisions
 *
 * @remarks
 * List retained immutable risk decisions for one account with an authenticated cursor.
 */
export function accountsListDecisions(
  client: NoResponseCore,
  request: operations.ListAccountDecisionsRequest,
  options?: RequestOptions,
): APIPromise<
  PageIterator<
    Result<
      operations.ListAccountDecisionsResponse,
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
    { cursor: string }
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
  request: operations.ListAccountDecisionsRequest,
  options?: RequestOptions,
): Promise<
  [
    PageIterator<
      Result<
        operations.ListAccountDecisionsResponse,
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
      { cursor: string }
    >,
    APICall,
  ]
> {
  const parsed = safeParse(
    request,
    (value) =>
      z.parse(operations.ListAccountDecisionsRequest$outboundSchema, value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [haltIterator(parsed), { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;

  const pathParams = {
    account_id: encodeSimple("account_id", payload.account_id, {
      explode: false,
      charEncoding: "percent",
    }),
  };
  const path = pathToFunc("/v1/accounts/{account_id}/decisions")(pathParams);

  const query = encodeFormQuery({
    "cursor": payload.cursor,
    "limit": payload.limit,
  });

  const headers = new Headers(compactMap({
    Accept: "application/json",
  }));

  const secConfig = await extractSecurity(client._options.apiKey);
  const securityInput = secConfig == null ? {} : { apiKey: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "listAccountDecisions",
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
    method: "GET",
    baseURL: options?.serverURL,
    path: path,
    headers: headers,
    query: query,
    body: body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return [haltIterator(requestRes), { status: "invalid" }];
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
    return [haltIterator(doResult), { status: "request-error", request: req }];
  }
  const response = doResult.value;

  const responseFields = {
    HttpMeta: { Response: response, Request: req },
  };

  const [result, raw] = await M.match<
    operations.ListAccountDecisionsResponse,
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
    M.json(200, operations.ListAccountDecisionsResponse$inboundSchema, {
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
    return [haltIterator(result), {
      status: "complete",
      request: req,
      response,
    }];
  }

  const nextFunc = (
    responseData: unknown,
  ): {
    next: Paginator<
      Result<
        operations.ListAccountDecisionsResponse,
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
    >;
    "~next"?: { cursor: string };
  } => {
    const nextCursor = (responseData as { next_cursor?: unknown }).next_cursor;
    if (typeof nextCursor !== "string") {
      return { next: () => null };
    }
    if (nextCursor.trim() === "") {
      return { next: () => null };
    }

    const nextVal = () =>
      accountsListDecisions(
        client,
        {
          ...request,
          cursor: nextCursor,
        },
        options,
      );

    return { next: nextVal, "~next": { cursor: nextCursor } };
  };

  const page = { ...result, ...nextFunc(raw) };
  return [{ ...page, ...createPageIterator(page, (v) => !v.ok) }, {
    status: "complete",
    request: req,
    response,
  }];
}
