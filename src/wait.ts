/**
 * Poll an assessment until it is complete. Hand-written; not generated.
 */
import { RequestTimeoutError } from "./models/errors/http-client-errors.js";
import type { Assessment } from "./models/assessment.js";
import type { ResponseMode } from "./models/response-mode.js";
import type { WithMeta } from "./meta.js";

export const DEFAULT_WAIT_TIMEOUT_MS = 30_000;
/** The shortest interval between polls when the server sends no Retry-After. */
export const MIN_POLL_INTERVAL_MS = 1_000;

export type WaitOptions = {
  /**
   * Stop polling after this long. Default 30 000 ms. If the latest answer is
   * partial by then, wait returns it (its status stays "partial"); if it is
   * still pending, wait throws an APITimeoutError.
   */
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
 * Poll `get` until the assessment's status is "complete". Each poll waits the
 * server's Retry-After, with a 1 second floor, and the whole wait is bounded
 * by `timeoutMs` (default 30 s). When the time runs out, a partial answer is
 * returned as it stands, with status "partial", and a pending one throws an
 * APITimeoutError, because a pending assessment has no recommendation yet.
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
  let last: WithMeta<Assessment> | undefined;
  const timedOut = (): WithMeta<Assessment> => {
    if (last?.status === "partial") return last;
    throw new RequestTimeoutError(`Timed out after ${timeoutMs} ms waiting for assessment ${assessmentId}`);
  };
  const getOptions: { responseMode?: ResponseMode; signal?: AbortSignal; timeoutMs?: number } = {};
  if (options.responseMode !== undefined) getOptions.responseMode = options.responseMode;
  if (options.signal !== undefined) getOptions.signal = options.signal;
  for (;;) {
    const requestRemaining = deadline - Date.now();
    if (requestRemaining <= 0) return timedOut();
    getOptions.timeoutMs = requestRemaining;
    let assessment: WithMeta<Assessment>;
    try {
      assessment = await get(assessmentId, getOptions);
    } catch (error) {
      // The last poll ran into the deadline: a partial answer still stands.
      if (error instanceof RequestTimeoutError && !options.signal?.aborted && last?.status === "partial") return last;
      throw error;
    }
    if (assessment.status === "complete") return assessment;
    last = assessment;
    const remaining = deadline - Date.now();
    if (remaining <= 0) return timedOut();
    const retryAfter = assessment.meta.retryAfter;
    const delay = Math.max(MIN_POLL_INTERVAL_MS, (retryAfter ?? 0) * 1000);
    await sleep(Math.min(delay, remaining), options.signal);
  }
}
