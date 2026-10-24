import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Band, Band$inboundSchema, Band$outboundSchema } from "./band.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  Recommendation,
  Recommendation$inboundSchema,
  Recommendation$outboundSchema,
} from "./recommendation.js";
import {
  RiskConfidence,
  RiskConfidence$inboundSchema,
  RiskConfidence$outboundSchema,
} from "./risk-confidence.js";
import {
  RiskCoverage,
  RiskCoverage$inboundSchema,
  RiskCoverage$Outbound,
  RiskCoverage$outboundSchema,
} from "./risk-coverage.js";
import {
  RiskDetails,
  RiskDetails$inboundSchema,
  RiskDetails$Outbound,
  RiskDetails$outboundSchema,
} from "./risk-details.js";
import {
  RiskReason,
  RiskReason$inboundSchema,
  RiskReason$Outbound,
  RiskReason$outboundSchema,
} from "./risk-reason.js";
import {
  RiskSummary,
  RiskSummary$inboundSchema,
  RiskSummary$Outbound,
  RiskSummary$outboundSchema,
} from "./risk-summary.js";

/**
 * The one risk decision for this event. score is 0 (safe) to 100 (risky): the sum of the weights of the reasons that fired, clamped to 0 to 100, from hand-set versioned weights. Every answer with a recommendation carries it, and the top-level recommendation equals risk.recommendation. It names no source or provider.
 */
export type Risk = {
  score: number;
  /**
   * low 0-29, medium 30-59, high 60-84, critical 85-100.
   */
  band: Band;
  /**
   * The recommended action: allow, step_up or review. Your application applies it.
   */
  recommendation: Recommendation;
  /**
   * true when the workspace's block threshold is set and score reached it. A provider hook can deny the account creation on it; the provider decides and enforces. It does not change recommendation. It is false while blocking is off, the default, and a body from before the flag existed omits it: read absent as false.
   */
  block?: boolean | undefined;
  /**
   * The block threshold this answer used: block is true exactly when score is at least this value. Absent while blocking is off. NoResponse sets it per workspace on request, at or above the review threshold.
   */
  blockThreshold?: number | undefined;
  /**
   * How much of the planned evidence answered; it says nothing about risk.
   */
  confidence: RiskConfidence;
  /**
   * Version of the hand-authored heuristic weights that produced the recommendation, for example 'risk-2026-10.7'. A workspace threshold override adds a +t<N> suffix, e.g. 'risk-2026-10.7+t3'.
   */
  policyVersion: string;
  /**
   * Labels the v0 policy as hand-authored and not statistically validated.
   */
  policyBasis: "heuristic_unvalidated";
  /**
   * Every reason that fired, highest weight first. The weights sum to score before clamping.
   */
  reasons: Array<RiskReason>;
  /**
   * A few typed facts per identifier. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer. Lanes that do not exist yet leave their members absent.
   */
  summary?: RiskSummary | undefined;
  /**
   * Sources counted by state, not named.
   */
  coverage: RiskCoverage;
  /**
   * Detailed view only (response_mode=detailed, which needs the detailed scope); a standard answer leaves it out. Merged observations without provider, source, origin, raw breach record, value or score.
   */
  details?: RiskDetails | undefined;
};

/** @internal */
export const Risk$inboundSchema: z.ZodMiniType<Risk, unknown> = z.pipe(
  z.object({
    score: types.number(),
    band: Band$inboundSchema,
    recommendation: Recommendation$inboundSchema,
    block: types.optional(types.boolean()),
    block_threshold: types.optional(types.number()),
    confidence: RiskConfidence$inboundSchema,
    policy_version: types.string(),
    policy_basis: types.literal("heuristic_unvalidated"),
    reasons: z.array(RiskReason$inboundSchema),
    summary: types.optional(RiskSummary$inboundSchema),
    coverage: RiskCoverage$inboundSchema,
    details: types.optional(RiskDetails$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "block_threshold": "blockThreshold",
      "policy_version": "policyVersion",
      "policy_basis": "policyBasis",
    });
  }),
);
/** @internal */
export type Risk$Outbound = {
  score: number;
  band: string;
  recommendation: string;
  block?: boolean | undefined;
  block_threshold?: number | undefined;
  confidence: string;
  policy_version: string;
  policy_basis: "heuristic_unvalidated";
  reasons: Array<RiskReason$Outbound>;
  summary?: RiskSummary$Outbound | undefined;
  coverage: RiskCoverage$Outbound;
  details?: RiskDetails$Outbound | undefined;
};

/** @internal */
export const Risk$outboundSchema: z.ZodMiniType<Risk$Outbound, Risk> = z.pipe(
  z.object({
    score: z.int(),
    band: Band$outboundSchema,
    recommendation: Recommendation$outboundSchema,
    block: z.optional(z.boolean()),
    blockThreshold: z.optional(z.int()),
    confidence: RiskConfidence$outboundSchema,
    policyVersion: z.string(),
    policyBasis: z.literal("heuristic_unvalidated"),
    reasons: z.array(RiskReason$outboundSchema),
    summary: z.optional(RiskSummary$outboundSchema),
    coverage: RiskCoverage$outboundSchema,
    details: z.optional(RiskDetails$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      blockThreshold: "block_threshold",
      policyVersion: "policy_version",
      policyBasis: "policy_basis",
    });
  }),
);

export function riskToJSON(risk: Risk): string {
  return JSON.stringify(Risk$outboundSchema.parse(risk));
}
export function riskFromJSON(
  jsonString: string,
): SafeParseResult<Risk, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Risk$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Risk' from JSON`,
  );
}
