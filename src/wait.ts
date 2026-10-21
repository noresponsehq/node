/**
 * Poll an assessment until it is no longer pending. Hand-written; not generated.
 */
import { RequestTimeoutError } from "./models/errors/http-client-errors.js";
import type { Assessment } from "./models/assessment.js";
import type { ResponseMode } from "./models/response-mode.js";
import type { WithMeta } from "./meta.js";

export const DEFAULT_WAIT_TIMEOUT_MS = 30_000;
/** The shortest interval between polls when the server sends no Retry-After. */
export const MIN_POLL_INTERVAL_MS = 1_000;

export type WaitOptions = {
  /** Give up after this long with an APITimeoutError. Default 30 000 ms. */
  timeoutMs?: number;
  responseMode?: ResponseMode;
  /** Abort the wait early. */
  signal?: AbortSignal;
};

export type Getter = (
  assessmentId: string,
  options: { responseMode?: ResponseMode; signal?: AbortSignal; timeoutMs?: number },
) => Promise<WithMeta<Assessment>>;

function sleep(ms: number, signal: AbortSignal | undefined): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason instanceof Error ? signal.reason : new Error("Wait aborted"));
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    function onAbort() {
      clearTimeout(timer);
      reject(signal?.reason instanceof Error ? signal.reason : new Error("Wait aborted"));
    }
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Poll `get` until the assessment is not pending. Each poll waits the
 * server's Retry-After, with a 1 second floor, and the whole wait is bounded
 * by `timeoutMs` (default 30 s), after which an APITimeoutError is thrown.
 */
export async function waitForAssessment(
  get: Getter,
  assessmentId: string,
  options: WaitOptions = {},
): Promise<WithMeta<Assessment>> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_WAIT_TIMEOUT_MS;
  if (!Number.isInteger(timeoutMs) || timeoutMs <= 0) {
    throw new TypeError("timeoutMs must be a positive integer");
  }
  const deadline = Date.now() + timeoutMs;
  const getOptions: { responseMode?: ResponseMode; signal?: AbortSignal; timeoutMs?: number } = {};
  if (options.responseMode !== undefined) getOptions.responseMode = options.responseMode;
  if (options.signal !== undefined) getOptions.signal = options.signal;
  for (;;) {
    const requestRemaining = deadline - Date.now();
    if (requestRemaining <= 0) {
      throw new RequestTimeoutError(`Timed out after ${timeoutMs} ms waiting for assessment ${assessmentId}`);
    }
    getOptions.timeoutMs = requestRemaining;
    const assessment = await get(assessmentId, getOptions);
    if (assessment.status !== "pending") return assessment;
    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      throw new RequestTimeoutError(`Timed out after ${timeoutMs} ms waiting for assessment ${assessmentId}`);
    }
    const retryAfter = assessment.meta.retryAfter;
    const delay = Math.max(MIN_POLL_INTERVAL_MS, (retryAfter ?? 0) * 1000);
    await sleep(Math.min(delay, remaining), options.signal);
  }
}
