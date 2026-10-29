import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type OperationalAggregateBucket = {
  start: string;
  attempts: number;
  succeeded: number;
  failed: number;
  clientErrors: number;
  serverErrors: number;
  replays: number;
  incompleteWrites: number;
  unattributedKeys: number;
  /**
   * Continuous percentile over retained attempts. Omitted when there are no captured samples.
   */
  p50Ms?: number | undefined;
  /**
   * Continuous percentile over retained attempts. Omitted when there are no captured samples.
   */
  p95Ms?: number | undefined;
  /**
   * Continuous percentile over retained attempts. Omitted when there are no captured samples.
   */
  p99Ms?: number | undefined;
};

/** @internal */
export const OperationalAggregateBucket$inboundSchema: z.ZodMiniType<
  OperationalAggregateBucket,
  unknown
> = z.pipe(
  z.object({
    start: types.string(),
    attempts: types.number(),
    succeeded: types.number(),
    failed: types.number(),
    client_errors: types.number(),
    server_errors: types.number(),
    replays: types.number(),
    incomplete_writes: types.number(),
    unattributed_keys: types.number(),
    p50_ms: types.optional(types.number()),
    p95_ms: types.optional(types.number()),
    p99_ms: types.optional(types.number()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "client_errors": "clientErrors",
      "server_errors": "serverErrors",
      "incomplete_writes": "incompleteWrites",
      "unattributed_keys": "unattributedKeys",
      "p50_ms": "p50Ms",
      "p95_ms": "p95Ms",
      "p99_ms": "p99Ms",
    });
  }),
);

export function operationalAggregateBucketFromJSON(
  jsonString: string,
): SafeParseResult<OperationalAggregateBucket, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => OperationalAggregateBucket$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'OperationalAggregateBucket' from JSON`,
  );
}
