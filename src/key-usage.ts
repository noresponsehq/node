/**
 * The key usage buffer. Hand-written; not generated.
 *
 * Your API gateway calls `record` once per request made with a key your signup
 * gate issued. The buffer keeps the facts in memory and sends them to POST
 * /v1/key_usage/batches in the background: when `batchSize` facts are queued,
 * every `flushIntervalMs`, and on `flush()` or `close()`. `record` never
 * blocks and never throws. When the queue is full the oldest fact is dropped
 * and counted. A raw key passed as `key` is hashed here and never sent.
 */
import { hashIssuedCredential } from "./issued-credential.js";
import type * as models from "./models/index.js";

/** Most events in one batch, and most bytes in one batch body. */
export const MAX_BATCH_EVENTS = 500;
export const MAX_BATCH_BYTES = 256 * 1024;
export const DEFAULT_BATCH_SIZE = 100;
export const DEFAULT_FLUSH_INTERVAL_MS = 5_000;
export const DEFAULT_MAX_QUEUE = 10_000;

const MAX_USER_AGENT = 512;
const MAX_TOKENS = 1_000_000_000;
const SHA256 = /^[0-9a-f]{64}$/;
const MODEL = /^[A-Za-z0-9][A-Za-z0-9._:/@+-]{0,127}$/;
// The server reads at most MAX_BATCH_BYTES; keep a little room for the envelope.
const BODY_BUDGET = MAX_BATCH_BYTES - 64;
const ENVELOPE_BYTES = '{"events":[]}'.length;

/** One request made with an issued key. */
export type KeyUsageFact = {
  /** The issued key itself. It is hashed in this process and only the hash is sent. */
  key?: string;
  /** SHA-256 of the issued key (hashIssuedCredential), when you already hold it. */
  keySha256?: string;
  /** The client IP address the request came from. */
  ip: string;
  /** The request's User-Agent header; cut to 512 characters. */
  userAgent?: string;
  /** The model or product the request used, such as gpt-4o-mini. */
  model?: string;
  inputTokens?: number;
  outputTokens?: number;
  /** When the request was made. Defaults to now. */
  occurredAt?: Date | string;
};

export type KeyUsageBufferOptions = {
  /** Send once this many facts are queued. Default 100, at most 500. */
  batchSize?: number;
  /** Send whatever is queued this often, in milliseconds. Default 5000. The timer never keeps the process alive. */
  flushIntervalMs?: number;
  /** Most facts held in memory. Default 10 000. When full, the oldest fact is dropped. */
  maxQueue?: number;
  /** Record this share of facts, from above 0 to 1. Default 1 (every fact). Sent as sample_rate so totals stay right. */
  sampleRate?: number;
  /** Called with each error a background send hit. The facts of that batch are counted in `failed`. */
  onError?: (error: unknown) => void;
  /** The sampler's random source, for tests. Default Math.random. */
  random?: () => number;
};

export type KeyUsageStats = {
  /** Facts waiting to be sent. */
  queued: number;
  /** Facts the API accepted or ignored. */
  sent: number;
  /** Facts dropped because the queue was full or the buffer was closed. */
  dropped: number;
  /** Facts whose batch failed after the client's retries. */
  failed: number;
  /** Facts refused before queueing: no key, no IP, or an unreadable time. */
  invalid: number;
};

/** What the buffer sends through: `client.keyUsage`. */
export interface KeyUsageSender {
  record(batch: models.KeyUsageBatchRequest, options?: { idempotencyKey?: string }): Promise<unknown>;
}

type Queued = { event: models.KeyUsageEvent; bytes: number };

function wireSize(event: models.KeyUsageEvent): number {
  const wire: Record<string, unknown> = { key_sha256: event.keySha256, ip: event.ip, occurred_at: event.occurredAt };
  if (event.userAgent !== undefined) wire["user_agent"] = event.userAgent;
  if (event.model !== undefined) wire["model"] = event.model;
  if (event.inputTokens !== undefined) wire["input_tokens"] = event.inputTokens;
  if (event.outputTokens !== undefined) wire["output_tokens"] = event.outputTokens;
  // The generated client sends sample_rate always, 1 by default.
  wire["sample_rate"] = event.sampleRate ?? 1;
  // Byte length of the UTF-8 encoding, plus the separating comma.
  return new TextEncoder().encode(JSON.stringify(wire)).length + 1;
}

function tokens(value: unknown): number | undefined {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= MAX_TOKENS ? value : undefined;
}

function userAgent(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  // eslint-disable-next-line no-control-regex
  const cleaned = Array.from(value.replace(/[\u0000-\u001f\u007f]/g, " ")).slice(0, MAX_USER_AGENT).join("").trim();
  return cleaned === "" ? undefined : cleaned;
}

function occurred(value: unknown): string | undefined {
  if (value === undefined) return new Date().toISOString();
  const date = value instanceof Date ? value : typeof value === "string" ? new Date(value) : undefined;
  if (!date || Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function toEvent(fact: KeyUsageFact, sampleRate: number): models.KeyUsageEvent | undefined {
  let keySha256: string | undefined;
  if (typeof fact.keySha256 === "string" && SHA256.test(fact.keySha256.toLowerCase())) {
    keySha256 = fact.keySha256.toLowerCase();
  } else if (typeof fact.key === "string" && fact.key !== "") {
    keySha256 = hashIssuedCredential(fact.key);
  }
  if (keySha256 === undefined) return undefined;
  if (typeof fact.ip !== "string") return undefined;
  const ip = fact.ip.trim();
  // eslint-disable-next-line no-control-regex
  if (ip.length < 2 || ip.length > 64 || /[\u0000-\u001f\u007f]/.test(ip)) return undefined;
  const occurredAt = occurred(fact.occurredAt);
  if (occurredAt === undefined) return undefined;
  const event: models.KeyUsageEvent = { keySha256, ip, occurredAt };
  const agent = userAgent(fact.userAgent);
  if (agent !== undefined) event.userAgent = agent;
  if (typeof fact.model === "string" && MODEL.test(fact.model)) event.model = fact.model;
  const input = tokens(fact.inputTokens);
  if (input !== undefined) event.inputTokens = input;
  const output = tokens(fact.outputTokens);
  if (output !== undefined) event.outputTokens = output;
  if (sampleRate < 1) event.sampleRate = sampleRate;
  return event;
}

function positiveInteger(value: number | undefined, fallback: number, name: string, max = Number.MAX_SAFE_INTEGER): number {
  if (value === undefined) return fallback;
  if (!Number.isInteger(value) || value <= 0 || value > max) throw new TypeError(`${name} must be an integer from 1 to ${max}`);
  return value;
}

/**
 * Buffers key usage and sends it to POST /v1/key_usage/batches in the
 * background. Create one per process with `client.keyUsage.buffer()`, call
 * `record` on every request made with an issued key, and `close()` on
 * shutdown.
 */
export class KeyUsageBuffer {
  private readonly queue: Queued[] = [];
  private readonly batchSize: number;
  private readonly maxQueue: number;
  private readonly sampleRate: number;
  private readonly onError: ((error: unknown) => void) | undefined;
  private readonly random: () => number;
  private readonly timer: ReturnType<typeof setInterval> | undefined;
  private inflight: Promise<void> | null = null;
  private closed = false;
  private counts = { sent: 0, dropped: 0, failed: 0, invalid: 0 };

  constructor(private readonly sender: KeyUsageSender, options: KeyUsageBufferOptions = {}) {
    this.batchSize = positiveInteger(options.batchSize, DEFAULT_BATCH_SIZE, "batchSize", MAX_BATCH_EVENTS);
    this.maxQueue = positiveInteger(options.maxQueue, DEFAULT_MAX_QUEUE, "maxQueue");
    const interval = positiveInteger(options.flushIntervalMs, DEFAULT_FLUSH_INTERVAL_MS, "flushIntervalMs");
    const rate = options.sampleRate ?? 1;
    if (typeof rate !== "number" || !(rate > 0 && rate <= 1)) throw new TypeError("sampleRate must be above 0 and at most 1");
    this.sampleRate = rate;
    this.onError = options.onError;
    this.random = options.random ?? Math.random;
    this.timer = setInterval(() => {
      if (this.queue.length > 0) void this.pump();
    }, interval);
    (this.timer as { unref?: () => void }).unref?.();
  }

  /** Queue one fact. Never blocks and never throws; a fact without a key, an IP or a readable time is counted in `invalid`. */
  record(fact: KeyUsageFact): void {
    try {
      if (this.closed) {
        this.counts.dropped++;
        return;
      }
      if (this.sampleRate < 1 && this.random() >= this.sampleRate) return;
      const event = toEvent(fact, this.sampleRate);
      if (event === undefined) {
        this.counts.invalid++;
        return;
      }
      while (this.queue.length >= this.maxQueue) {
        this.queue.shift();
        this.counts.dropped++;
      }
      this.queue.push({ event, bytes: wireSize(event) });
      if (this.queue.length >= this.batchSize && this.inflight === null) void this.pump();
    } catch {
      this.counts.invalid++;
    }
  }

  /** Send everything queued now, and resolve once it has been sent or has failed. */
  async flush(): Promise<void> {
    while (this.inflight !== null || this.queue.length > 0) await this.pump();
  }

  /** Stop the timer, send what is queued and refuse further facts (counted as dropped). */
  async close(): Promise<void> {
    this.closed = true;
    if (this.timer !== undefined) clearInterval(this.timer);
    await this.flush();
  }

  stats(): KeyUsageStats {
    return { queued: this.queue.length, ...this.counts };
  }

  /** One send loop at a time; it drains the queue in batches. */
  private pump(): Promise<void> {
    if (this.inflight === null) {
      this.inflight = this.drain().finally(() => {
        this.inflight = null;
      });
    }
    return this.inflight;
  }

  private async drain(): Promise<void> {
    while (this.queue.length > 0) {
      const batch = this.take();
      try {
        await this.sender.record({ events: batch.map((item) => item.event) }, { idempotencyKey: globalThis.crypto.randomUUID() });
        this.counts.sent += batch.length;
      } catch (error) {
        this.counts.failed += batch.length;
        try {
          this.onError?.(error);
        } catch {
          // A failing callback must not stop the buffer.
        }
      }
    }
  }

  /** The oldest facts that fit one batch: at most 500 events and MAX_BATCH_BYTES of body. */
  private take(): Queued[] {
    let bytes = ENVELOPE_BYTES;
    let count = 0;
    while (count < this.queue.length && count < MAX_BATCH_EVENTS) {
      const next = this.queue[count]!.bytes;
      if (count > 0 && bytes + next > BODY_BUDGET) break;
      bytes += next;
      count++;
    }
    return this.queue.splice(0, count);
  }
}
