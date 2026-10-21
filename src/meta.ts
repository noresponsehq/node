/**
 * Response metadata the SDK lifts from headers onto every returned model.
 * Hand-written; not generated.
 */
export type ResponseMeta = {
  /** The X-Request-ID header, to quote when contacting support. */
  requestId: string | null;
  /** Retry-After in whole seconds, when the server sent one. */
  retryAfter: number | null;
  /** The Location header: the polling path of a pending assessment. */
  location: string | null;
  /** True when the answer replays an earlier request with the same Idempotency-Key and body. */
  idempotentReplayed: boolean;
};

/** A model with the response metadata attached under `meta`. */
export type WithMeta<T> = T & { meta: ResponseMeta };

type HeaderMap = { [k: string]: Array<string> };

function header(headers: HeaderMap, name: string): string | null {
  const wanted = name.toLowerCase();
  for (const [key, values] of Object.entries(headers)) {
    if (key.toLowerCase() === wanted) return values[0] ?? null;
  }
  return null;
}

/** Retry-After as whole seconds. Only the delay-seconds form is served. */
export function parseRetryAfter(value: string | null | undefined): number | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^[0-9]{1,6}$/.test(trimmed)) return Number(trimmed);
  const date = Date.parse(trimmed);
  if (Number.isNaN(date)) return null;
  return Math.max(0, Math.ceil((date - Date.now()) / 1000));
}

export function toMeta(headers: HeaderMap): ResponseMeta {
  return {
    requestId: header(headers, "x-request-id"),
    retryAfter: parseRetryAfter(header(headers, "retry-after")),
    location: header(headers, "location"),
    idempotentReplayed: header(headers, "idempotent-replayed") === "true",
  };
}

export function withMeta<T extends object>(value: T, headers: HeaderMap): WithMeta<T> {
  return Object.assign(value, { meta: toMeta(headers) });
}
