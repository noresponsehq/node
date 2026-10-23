import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The 202 answer of POST /v1/key_usage/batches. A replay with the same Idempotency-Key and body answers the same record and counts nothing again.
 */
export type KeyUsageBatch = {
  /**
   * Opaque, server-assigned id of the batch: 'kub_' and a 26-character Crockford base32 ULID.
   */
  id: string;
  /**
   * When NoResponse first recorded the batch.
   */
  receivedAt: string;
  /**
   * Events counted.
   */
  accepted: number;
  /**
   * Events that added nothing: a private, reserved or unreadable ip, or an occurred_at more than 24 hours old or more than 5 minutes ahead.
   */
  ignored: number;
};

/** @internal */
export const KeyUsageBatch$inboundSchema: z.ZodMiniType<
  KeyUsageBatch,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    received_at: types.string(),
    accepted: types.number(),
    ignored: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "received_at": "receivedAt",
    });
  }),
);

export function keyUsageBatchFromJSON(
  jsonString: string,
): SafeParseResult<KeyUsageBatch, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => KeyUsageBatch$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'KeyUsageBatch' from JSON`,
  );
}
