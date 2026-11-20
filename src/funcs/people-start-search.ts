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
 * Search again on a value of one of a workspace person's records.
 *
 * @remarks
 * Starts a search on the person alone, outside any group, as the group route does. The person's own enrichment then follows what it finds. Its records join the person report. Starts a new search on the value of one field of one of the person's records: a lookup's, a profile's or one an earlier search found. Name the record and the field; the value itself is not sent. The field's kind must be email, phone, username, person_name, password, hash, ip or domain. A domain search finds the breach rows of every email address at the domain, which must be a registrable domain or a host under one; any other domain answers 400. After a workspace person's own investigation or a group's screening, while the environment's enrichment mode, or an investigation's override, is automatic, enrichment also starts searches by itself, with requested_by enrichment, on the distinctive values of the enrichment kinds (usernames by default; email addresses, phone numbers and person names when named) of records more likely than min_likelihood (0.5 by default) to be the person's: each value at most once per person (once more if that search failed), at most 5 searches from one search's records and 20 per person, at most 6 searches deep, within max_spend and the deadline when set, and within the screening cap; at the screening cap it waits and tries again later. A record a search finds starts from the likelihood of the record it came from, divided by one plus the results the search found on that site, or anywhere for a name search, so a chain grows less likely with each search and stops. A group takes mode suggest while the workspace has not set a mode. In suggest mode enrichment starts none by itself, and the person report lists what it would start in suggested_searches. The search runs the breach search and the account and phone lookups that take the value's kind, under the environment's source controls, and finishes seconds later. A password or hash search counts first: it stops at counted with rows, how many breach rows hold the value, and runs only when a person runs it. Name a table, as a lookup remaining entry names it, to fetch the rows an earlier search left out, up to 100. What the search finds joins the person's lookup records as leads, each match naming the search; the person report lists the searches, each with the value and the record and field it came from, and its records are scored like the rest. Without an Idempotency-Key, starting the same open search returns it. Its estimate counts against the environment's screening_daily_cap, and one the cap cannot hold answers 409 screening_cap_exceeded. A record or field the person does not hold answers 404. Each search is audited as person.search_started. Send an Idempotency-Key to retry safely: the same key and request return the same resource in its current state while it is retained, even after work completes. Reusing the key with different input answers 409 idempotency_key_reused. Use a new key for a deliberate new operation. The investigations scope grants this operation. Explicit evidence.read restrictions override default evidence access. The API key selects the workspace and environment.
 */
export function peopleStartSearch(
  client: NoResponseCore,
  request: operations.StartWorkspacePersonSearchRequest,
  options?: RequestOptions,
): APIPromise<
  Result<
    operations.StartWorkspacePersonSearchResponse,
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
  request: operations.StartWorkspacePersonSearchRequest,
  options?: RequestOptions,
): Promise<
  [
    Result<
      operations.StartWorkspacePersonSearchResponse,
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
      z.parse(
        operations.StartWorkspacePersonSearchRequest$outboundSchema,
        value,
      ),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.body, { explode: true });

  const pathParams = {
    person_id: encodeSimple("person_id", payload.person_id, {
      explode: false,
      charEncoding: "percent",
    }),
  };
  const path = pathToFunc("/v1/people/{person_id}/searches")(pathParams);

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
    operationID: "startWorkspacePersonSearch",
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
    operations.StartWorkspacePersonSearchResponse,
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
    M.json(202, operations.StartWorkspacePersonSearchResponse$inboundSchema, {
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
