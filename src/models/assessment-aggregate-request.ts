import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { ClosedEnum } from "../types/enums.js";
import {
  AggregateDimension,
  AggregateDimension$outboundSchema,
} from "./aggregate-dimension.js";
import {
  AnswerRevision,
  AnswerRevision$outboundSchema,
} from "./answer-revision.js";
import { Band, Band$outboundSchema } from "./band.js";
import { Bucket, Bucket$outboundSchema } from "./bucket.js";
import { Decision, Decision$outboundSchema } from "./decision.js";
import { Flow, Flow$outboundSchema } from "./flow.js";
import { Impact, Impact$outboundSchema } from "./impact.js";
import { Lane, Lane$outboundSchema } from "./lane.js";
import { ListMatch, ListMatch$outboundSchema } from "./list-match.js";
import { Population, Population$outboundSchema } from "./population.js";
import { ReasonCode, ReasonCode$outboundSchema } from "./reason-code.js";
import {
  Recommendation,
  Recommendation$outboundSchema,
} from "./recommendation.js";
import { Status, Status$outboundSchema } from "./status.js";

export const AssessmentAggregateRequestMetric = {
  Count: "count",
  ScoreHistogram: "score_histogram",
  ScoreOutcomes: "score_outcomes",
  LateFlips: "late_flips",
} as const;
export type AssessmentAggregateRequestMetric = ClosedEnum<
  typeof AssessmentAggregateRequestMetric
>;

/**
 * Count this environment's assessments created in [from,to) by bucket, from counts kept as each assessment is first answered, not by scanning assessments. Each assessment counts once, by its first answer (the answer served when it was first answered); later revisions and late results do not count it again, and late_flips counts its later account decision changes. from and to start a bucket (an hour, a UTC day, or a week from Monday 00:00 UTC), cover at most 366 days (31 for hour buckets) and from is inside the retention period. The filters are POST /v1/assessments/search's and describe the first answer, so a cell drills down to search with the same filters, revision first and the cell's bucket as from and to. Counts hold no identifier and stay when an assessment or account is deleted or erased; they expire with retention and go with the workspace. Reasons are counted by code and impact band, not by weight. No Idempotency-Key. Select retained_first_answers for exact facet filters and pairs over retained detail. This mode supports count, score_histogram and score_outcomes, and refuses late_flips. It has a 31-day and 100000-record work budget.
 */
export type AssessmentAggregateRequest = {
  /**
   * The first bucket's start.
   */
  from: string;
  /**
   * The end, excluded: the start of the bucket after the last.
   */
  to: string;
  /**
   * The period each count covers, in UTC; a week starts on Monday.
   */
  bucket: Bucket;
  /**
   * At most two dimensions to count by, of which at most one is reason, lane, country or asn. An assessment counts once in each of its reasons and incomplete lanes, so those groups can add up to more than the bucket's count. With population retained_first_answers, both dimensions can be facets; counts cover retained first answers only.
   */
  groupBy?: Array<AggregateDimension> | undefined;
  /**
   * count: each bucket's count and groups. score_histogram: first answers by flow and 5-point score bucket. score_outcomes: the histogram's first answers that have a reported outcome, by flow, 5-point score bucket and the latest outcome reported for the assessment (POST /v1/assessments/{assessment_id}/outcomes); the rest of a bin has none reported. late_flips: changes of an assessment's account decision for its flow after its first answer, by from, to and delay.
   */
  metrics?: Array<AssessmentAggregateRequestMetric> | undefined;
  /**
   * The most groups answered: the largest over the whole range, then by value. groups_truncated says when there were more.
   */
  limit?: number | undefined;
  /**
   * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
   */
  flow?: Flow | undefined;
  /**
   * complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.
   */
  status?: Status | undefined;
  /**
   * The recommended action: allow, step_up or review. Your application applies it.
   */
  recommendation?: Recommendation | undefined;
  /**
   * An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.
   */
  decision?: Decision | undefined;
  /**
   * Which answer of each assessment the filters describe: latest, the latest stored revision, or first, the first answer, as served when the assessment was first answered (POST /v1/assessments/aggregate counts first answers). A cell of an aggregate drills down to POST /v1/assessments/search with the same filters, revision first and the cell's bucket as from and to.
   */
  revision?: AnswerRevision | undefined;
  /**
   * first_answers uses anonymous counters that can include erased detail. retained_first_answers computes exact intersections over retained first answers within 31 days. Requests exceeding the 100000-record work budget are refused.
   */
  population?: Population | undefined;
  band?: Band | undefined;
  /**
   * A stable reason code. New codes may appear; ignore any you do not know.
   */
  reason?: ReasonCode | undefined;
  /**
   * The selected reason's served impact band. Requires reason.
   */
  impact?: Impact | undefined;
  /**
   * An evidence lane: accounts (account presence for email and username), phone, breach, domain (the email domain's registration) and ip.
   */
  lane?: Lane | undefined;
  country?: string | undefined;
  asn?: number | undefined;
  /**
   * Inclusive lower score bound. Pending answers without a score do not match.
   */
  scoreMin?: number | undefined;
  /**
   * Inclusive upper score bound, at least score_min when both are supplied.
   */
  scoreMax?: number | undefined;
  /**
   * The list action captured at the first answer. Requires revision first. Older answers without captured list state do not match, including none.
   */
  listMatch?: ListMatch | undefined;
};

/** @internal */
export const AssessmentAggregateRequestMetric$outboundSchema: z.ZodMiniEnum<
  typeof AssessmentAggregateRequestMetric
> = z.enum(AssessmentAggregateRequestMetric);

/** @internal */
export type AssessmentAggregateRequest$Outbound = {
  from: string;
  to: string;
  bucket: string;
  group_by?: Array<string> | undefined;
  metrics?: Array<string> | undefined;
  limit: number;
  flow?: string | undefined;
  status?: string | undefined;
  recommendation?: string | undefined;
  decision?: string | undefined;
  revision?: string | undefined;
  population?: string | undefined;
  band?: string | undefined;
  reason?: string | undefined;
  impact?: string | undefined;
  lane?: string | undefined;
  country?: string | undefined;
  asn?: number | undefined;
  score_min?: number | undefined;
  score_max?: number | undefined;
  list_match?: string | undefined;
};

/** @internal */
export const AssessmentAggregateRequest$outboundSchema: z.ZodMiniType<
  AssessmentAggregateRequest$Outbound,
  AssessmentAggregateRequest
> = z.pipe(
  z.object({
    from: z.string(),
    to: z.string(),
    bucket: Bucket$outboundSchema,
    groupBy: z.optional(z.array(AggregateDimension$outboundSchema)),
    metrics: z.optional(
      z.array(AssessmentAggregateRequestMetric$outboundSchema),
    ),
    limit: z._default(z.int(), 20),
    flow: z.optional(Flow$outboundSchema),
    status: z.optional(Status$outboundSchema),
    recommendation: z.optional(Recommendation$outboundSchema),
    decision: z.optional(Decision$outboundSchema),
    revision: z.optional(AnswerRevision$outboundSchema),
    population: z.optional(Population$outboundSchema),
    band: z.optional(Band$outboundSchema),
    reason: z.optional(ReasonCode$outboundSchema),
    impact: z.optional(Impact$outboundSchema),
    lane: z.optional(Lane$outboundSchema),
    country: z.optional(z.string()),
    asn: z.optional(z.int()),
    scoreMin: z.optional(z.int()),
    scoreMax: z.optional(z.int()),
    listMatch: z.optional(ListMatch$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      groupBy: "group_by",
      scoreMin: "score_min",
      scoreMax: "score_max",
      listMatch: "list_match",
    });
  }),
);

export function assessmentAggregateRequestToJSON(
  assessmentAggregateRequest: AssessmentAggregateRequest,
): string {
  return JSON.stringify(
    AssessmentAggregateRequest$outboundSchema.parse(assessmentAggregateRequest),
  );
}
