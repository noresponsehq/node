import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Current retained delivery queue, independent of the requested attempt window and status filter. Endpoint filter applies. Does not prove customer enforcement execution.
 */
export type OperationalAggregateQueue = {
  pending: number;
  leased: number;
  deadRetained: number;
  oldestPendingAt?: string | undefined;
};

/** @internal */
export const OperationalAggregateQueue$inboundSchema: z.ZodMiniType<
  OperationalAggregateQueue,
  unknown
> = z.pipe(
  z.object({
    pending: types.number(),
    leased: types.number(),
    dead_retained: types.number(),
    oldest_pending_at: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "dead_retained": "deadRetained",
      "oldest_pending_at": "oldestPendingAt",
    });
  }),
);

export function operationalAggregateQueueFromJSON(
  jsonString: string,
): SafeParseResult<OperationalAggregateQueue, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => OperationalAggregateQueue$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'OperationalAggregateQueue' from JSON`,
  );
}
