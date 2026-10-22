import { readFileSync } from "node:fs";

export const fixture = (name) =>
  JSON.parse(readFileSync(new URL("./fixtures/" + name, import.meta.url), "utf8"));

export const PENDING = fixture("valid/assessment-pending.json");
export const COMPLETE = fixture("valid/assessment-complete.json");
export const RISK = fixture("valid/assessment-risk.json");
export const LIST = fixture("valid/assessment-list.json");
export const OUTCOME = fixture("valid/assessment-outcome.json");
export const ROTATION = fixture("valid/key-rotation.json");
export const INTEGRATION_AUTH0 = fixture("valid/integration-auth0.json");
export const INTEGRATION_ROTATED = fixture("valid/integration-auth0-rotated.json");
export const INTEGRATION_LIST = fixture("valid/integration-list.json");

export const REQUEST = { accountId: "usr_8f2k1", identifiers: { email: "jordan.lee@example.com", name: "Jordan Lee" } };

/** A JSON response with the headers every real answer carries. */
export function json(body, { status = 200, headers = {} } = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "x-request-id": "a".repeat(32), "cache-control": "no-store", ...headers },
  });
}

export function problem(status, code, extra = {}, headers = {}) {
  return new Response(
    JSON.stringify({
      type: `https://docs.noresponse.org/problems/${code}`,
      title: "Problem",
      status,
      detail: `detail for ${code}`,
      code,
      request_id: "b".repeat(32),
      ...extra,
    }),
    { status, headers: { "content-type": "application/problem+json", "x-request-id": "b".repeat(32), ...headers } },
  );
}

/**
 * A fetch stub that records every request (method, URL, headers, parsed body)
 * and answers from a queue of responses or a function of the request.
 */
export function fakeFetch(answers) {
  const calls = [];
  const queue = Array.isArray(answers) ? [...answers] : null;
  const fetcher = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    const text = await request.clone().text();
    const headers = Object.fromEntries(request.headers.entries());
    const call = { method: request.method, url: request.url, headers, body: text ? JSON.parse(text) : null };
    calls.push(call);
    const answer = queue ? queue.shift() : answers(call, calls.length);
    if (answer === undefined) throw new Error("fakeFetch: no answer queued for " + request.url);
    if (answer instanceof Error) throw answer;
    if (typeof answer === "function") return answer(request);
    return answer;
  };
  return { fetcher, calls };
}

/** Let every pending microtask and I/O callback run, so a retry can reach its timer. */
export async function flush(turns = 10) {
  for (let i = 0; i < turns; i++) await new Promise((resolve) => setImmediate(resolve));
}

/**
 * Drive a promise whose retries sleep on mocked setTimeout. Mocked time moves
 * in 50 ms steps, letting pending I/O settle between steps, until the promise
 * settles or the sum of `delays` has passed. Ticking each delay in one jump
 * raced the fetch mock on slower machines: a jump that lands before the
 * request's timer is armed is lost.
 */
export async function drive(timers, promise, delays) {
  let settled = false;
  const tracked = promise.finally(() => {
    settled = true;
  });
  tracked.catch(() => {});
  const budget = delays.reduce((sum, delay) => sum + delay, 0);
  for (let elapsed = 0; !settled && elapsed <= budget; elapsed += 50) {
    await flush();
    timers.tick(50);
  }
  await flush();
  return promise;
}

export function withEnv(values, fn) {
  const previous = {};
  for (const [key, value] of Object.entries(values)) {
    previous[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  const restore = () => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
  try {
    const result = fn();
    if (result && typeof result.then === "function") return result.finally(restore);
    restore();
    return result;
  } catch (error) {
    restore();
    throw error;
  }
}
