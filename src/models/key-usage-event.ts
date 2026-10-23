import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

/**
 * One request made with an issued key. An event whose ip is not a public address, or whose occurred_at is more than 24 hours old or more than 5 minutes ahead, is counted in ignored and adds nothing.
 */
export type KeyUsageEvent = {
  /**
   * SHA-256 of the issued key's UTF-8 bytes, as 64 lower-case hex characters: the value sent as issued_credential.sha256 when the account was assessed. Each SDK's issued-credential helper computes it.
   */
  keySha256: string;
  /**
   * The client IP address the request came from, IPv4 or IPv6, as your server saw it. Stored only as a keyed digest and its country.
   */
  ip: string;
  /**
   * When the request was made.
   */
  occurredAt: string;
  /**
   * The request's User-Agent header, at most 512 characters. Stored only as a keyed digest.
   */
  userAgent?: string | undefined;
  /**
   * The model or product the request used, such as gpt-4o-mini. Stored only as a keyed digest.
   */
  model?: string | undefined;
  /**
   * Input tokens the request consumed.
   */
  inputTokens?: number | undefined;
  /**
   * Output tokens the request produced.
   */
  outputTokens?: number | undefined;
  /**
   * The share of requests your sampler records, when it records only some: 0.1 means this event stands for 10 requests. Request and token totals are weighted by its inverse. Distinct IP and country counts see only the events sent.
   */
  sampleRate?: number | undefined;
};

/** @internal */
export type KeyUsageEvent$Outbound = {
  key_sha256: string;
  ip: string;
  occurred_at: string;
  user_agent?: string | undefined;
  model?: string | undefined;
  input_tokens?: number | undefined;
  output_tokens?: number | undefined;
  sample_rate: number;
};

/** @internal */
export const KeyUsageEvent$outboundSchema: z.ZodMiniType<
  KeyUsageEvent$Outbound,
  KeyUsageEvent
> = z.pipe(
  z.object({
    keySha256: z.string(),
    ip: z.string(),
    occurredAt: z.string(),
    userAgent: z.optional(z.string()),
    model: z.optional(z.string()),
    inputTokens: z.optional(z.int()),
    outputTokens: z.optional(z.int()),
    sampleRate: z._default(z.number(), 1),
  }),
  z.transform((v) => {
    return remap$(v, {
      keySha256: "key_sha256",
      occurredAt: "occurred_at",
      userAgent: "user_agent",
      inputTokens: "input_tokens",
      outputTokens: "output_tokens",
      sampleRate: "sample_rate",
    });
  }),
);

export function keyUsageEventToJSON(keyUsageEvent: KeyUsageEvent): string {
  return JSON.stringify(KeyUsageEvent$outboundSchema.parse(keyUsageEvent));
}
