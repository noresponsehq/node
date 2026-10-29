import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AggregateBucket,
  AggregateBucket$inboundSchema,
} from "./aggregate-bucket.js";
import {
  AggregateDimension,
  AggregateDimension$inboundSchema,
} from "./aggregate-dimension.js";
import {
  AssessmentAggregateCoverage,
  AssessmentAggregateCoverage$inboundSchema,
} from "./assessment-aggregate-coverage.js";
import { Bucket, Bucket$inboundSchema } from "./bucket.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export const AssessmentAggregateMetric = {
  Count: "count",
  ScoreHistogram: "score_histogram",
  ScoreOutcomes: "score_outcomes",
  LateFlips: "late_flips",
} as const;
export type AssessmentAggregateMetric = OpenEnum<
  typeof AssessmentAggregateMetric
>;

/**
 * Body of the 200 answer to POST /v1/assessments/aggregate: one entry per bucket of [from,to), empty buckets included. Counts are of first answers and stay when an assessment or account is deleted or erased; search returns only assessments still retained.
 */
export type AssessmentAggregate = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  from: string;
  to: string;
  /**
   * The period each count covers, in UTC; a week starts on Monday.
   */
  bucket: Bucket;
  groupBy: Array<AggregateDimension>;
  metrics: Array<AssessmentAggregateMetric>;
  /**
   * The calling workspace's configured retention period in days. Default 365 (12 months), which is also the maximum: a workspace may only shorten it, to at least 1 day. Each record expires from its own created_at; see assessment expires_at.
   */
  retentionDays: number;
  /**
   * true when more groups had counts than limit allowed.
   */
  groupsTruncated: boolean;
  /**
   * Captured in the same database snapshot as the counts. Capture start times describe when counting began, not the earliest creation time counted: an older assessment may first answer later. Older outcomes are not inferred to be absent. Erased detail cannot be returned by drill-down even while its anonymous count remains.
   */
  coverage?: AssessmentAggregateCoverage | undefined;
  buckets: Array<AggregateBucket>;
};

/** @internal */
export const AssessmentAggregateMetric$inboundSchema: z.ZodMiniType<
  AssessmentAggregateMetric,
  unknown
> = openEnums.inboundSchema(AssessmentAggregateMetric);

/** @internal */
export const AssessmentAggregate$inboundSchema: z.ZodMiniType<
  AssessmentAggregate,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    from: types.string(),
    to: types.string(),
    bucket: Bucket$inboundSchema,
    group_by: z.array(AggregateDimension$inboundSchema),
    metrics: z.array(AssessmentAggregateMetric$inboundSchema),
    retention_days: z._default(types.number(), 365),
    groups_truncated: types.boolean(),
    coverage: types.optional(AssessmentAggregateCoverage$inboundSchema),
    buckets: z.array(AggregateBucket$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "group_by": "groupBy",
      "retention_days": "retentionDays",
      "groups_truncated": "groupsTruncated",
    });
  }),
);

export function assessmentAggregateFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentAggregate, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentAggregate$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentAggregate' from JSON`,
  );
}
