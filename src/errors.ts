/**
 * Error classes. Hand-written; not generated.
 *
 * The generated client throws one class per HTTP status (BadRequestError for
 * 400, AuthenticationError 401, PermissionDeniedError 403, NotFoundError 404,
 * ConflictError 409, RateLimitError 429) and APIStatusError for any other 4xx
 * or 5xx, all extending NoResponseError. Transport failures are ConnectionError
 * and RequestTimeoutError, exported here under the names APIConnectionError and
 * APITimeoutError as well. A 2xx whose body does not parse is a
 * ResponseValidationError (code "invalid_response").
 *
 * Every NoResponseError exposes the same fields whatever the status: status,
 * type, title, detail, code, requestId, retryAfter and invalidParams. The
 * per-status classes get them from the parsed problem document; the fallback
 * classes read them lazily from the raw body and headers.
 */
import { NoResponseError } from "./models/errors/no-response-error.js";
import { APIStatusError } from "./models/errors/api-status-error.js";
import { ResponseValidationError } from "./models/errors/response-validation-error.js";
import { ConnectionError, RequestTimeoutError } from "./models/errors/http-client-errors.js";
import { parseRetryAfter } from "./meta.js";

export {
  NoResponseError,
  APIStatusError,
  ResponseValidationError,
  ConnectionError,
  RequestTimeoutError,
};
export { BadRequestError } from "./models/errors/bad-request-error.js";
export { AuthenticationError } from "./models/errors/authentication-error.js";
export { PermissionDeniedError } from "./models/errors/permission-denied-error.js";
export { NotFoundError } from "./models/errors/not-found-error.js";
export { ConflictError } from "./models/errors/conflict-error.js";
export { RateLimitError } from "./models/errors/rate-limit-error.js";
export { SDKValidationError } from "./models/errors/sdk-validation-error.js";
export {
  HTTPClientError,
  InvalidRequestError,
  RequestAbortedError,
  UnexpectedClientError,
} from "./models/errors/http-client-errors.js";

/** The name the SDK design uses for a failed connection (DNS, TLS, reset). */
export const APIConnectionError = ConnectionError;
export type APIConnectionError = ConnectionError;
/** The name the SDK design uses for a timed-out request or a wait that gave up. */
export const APITimeoutError = RequestTimeoutError;
export type APITimeoutError = RequestTimeoutError;

export type InvalidParam = {
  field: string;
  reason: string;
  example?: string | undefined;
};

declare module "./models/errors/no-response-error.js" {
  interface NoResponseError {
    /** The HTTP status. Same value as statusCode. */
    status: number;
    /** The problem document's type URI, or null when the body was not a problem document. */
    type: string | null;
    title: string | null;
    detail: string | null;
    /** The stable machine code, for example rate_limited, or null. */
    code: string | null;
    /** The X-Request-ID of the failed request, to quote when contacting support. */
    requestId: string | null;
    /** Retry-After in whole seconds, or null when absent. */
    retryAfter: number | null;
    /** The offending fields of a 400, without their values. */
    invalidParams?: Array<InvalidParam> | undefined;
  }
}

type Problem = {
  type?: unknown;
  title?: unknown;
  detail?: unknown;
  code?: unknown;
  request_id?: unknown;
  invalid_params?: unknown;
};

const parsed = new WeakMap<NoResponseError, Problem>();

function problem(error: NoResponseError): Problem {
  let doc = parsed.get(error);
  if (doc === undefined) {
    doc = {};
    try {
      const value: unknown = JSON.parse(error.body);
      if (value !== null && typeof value === "object" && !Array.isArray(value)) doc = value as Problem;
    } catch {
      // Not a problem document: every field stays null.
    }
    parsed.set(error, doc);
  }
  return doc;
}

function text(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function lazy(name: string, compute: (error: NoResponseError) => unknown): void {
  // A getter on the prototype answers the fallback classes; the setter lets a
  // generated constructor assign the parsed field as an own property.
  Object.defineProperty(NoResponseError.prototype, name, {
    configurable: true,
    enumerable: false,
    get(this: NoResponseError) {
      return compute(this);
    },
    set(this: NoResponseError, value: unknown) {
      Object.defineProperty(this, name, { value, writable: true, enumerable: true, configurable: true });
    },
  });
}

lazy("status", (error) => error.statusCode);
lazy("type", (error) => text(problem(error).type));
lazy("title", (error) => text(problem(error).title));
lazy("detail", (error) => text(problem(error).detail));
lazy("code", (error) => {
  // A 2xx the SDK could not read (wrong content type or a body that does not match) is invalid_response.
  if (error instanceof ResponseValidationError || error.statusCode < 400) return "invalid_response";
  return text(problem(error).code);
});
lazy("requestId", (error) => text(problem(error).request_id) ?? error.headers.get("x-request-id"));
lazy("retryAfter", (error) => parseRetryAfter(error.headers.get("retry-after")));
lazy("invalidParams", (error) => {
  const params = problem(error).invalid_params;
  return Array.isArray(params) ? (params as Array<InvalidParam>) : undefined;
});

/** True for errors the SDK's retry policy treats as transient. */
export function isRetryable(error: unknown): boolean {
  if (error instanceof ConnectionError || error instanceof RequestTimeoutError) return true;
  if (error instanceof NoResponseError) {
    const status = error.statusCode;
    return status === 408 || status === 429 || status >= 500;
  }
  return false;
}
