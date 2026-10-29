import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  OperationalAggregateBucket,
  OperationalAggregateBucket$inboundSchema,
} from "./operational-aggregate-bucket.js";
import {
  OperationalAggregateQueue,
  OperationalAggregateQueue$inboundSchema,
} from "./operational-aggregate-queue.js";
import {
  OperationalAggregateTotals,
  OperationalAggregateTotals$inboundSchema,
} from "./operational-aggregate-totals.js";
import {
  RequestAggregateRequestBucket,
  RequestAggregateRequestBucket$inboundSchema,
} from "./request-aggregate-request-bucket.js";
import { Source, Source$inboundSchema } from "./source.js";

/**
 * One repeatable-read snapshot of retained request diagnostics or webhook attempts. Capture can have gaps and these counts are not a billing ledger. Unattributed keys include older requests and member requests. Queue state is current retained work, not a delivery success denominator.
 */
export type OperationalAggregate = {
  schemaVersion: "1";
  source: Source;
  from: string;
  to: string;
  asOf: string;
  retainedFrom: string;
  retentionDays: number;
  bucket: RequestAggregateRequestBucket;
  capture: "best_effort";
  population: "retained_attempts";
  totals: OperationalAggregateTotals;
  /**
   * Nonempty UTC buckets in ascending order. Counts include all retained matching attempts, without the log page limit.
   */
  buckets: Array<OperationalAggregateBucket>;
  /**
   * Current retained delivery queue, independent of the requested attempt window and status filter. Endpoint filter applies. Does not prove customer enforcement execution.
   */
  queue?: OperationalAggregateQueue | undefined;
};

/** @internal */
export const OperationalAggregate$inboundSchema: z.ZodMiniType<
  OperationalAggregate,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    source: Source$inboundSchema,
    from: types.string(),
    to: types.string(),
    as_of: types.string(),
    retained_from: types.string(),
    retention_days: types.number(),
    bucket: RequestAggregateRequestBucket$inboundSchema,
    capture: types.literal("best_effort"),
    population: types.literal("retained_attempts"),
    totals: OperationalAggregateTotals$inboundSchema,
    buckets: z.array(OperationalAggregateBucket$inboundSchema),
    queue: types.optional(OperationalAggregateQueue$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "as_of": "asOf",
      "retained_from": "retainedFrom",
      "retention_days": "retentionDays",
    });
  }),
);

export function operationalAggregateFromJSON(
  jsonString: string,
): SafeParseResult<OperationalAggregate, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => OperationalAggregate$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'OperationalAggregate' from JSON`,
  );
}
