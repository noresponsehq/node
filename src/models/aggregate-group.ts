import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AggregateGroupListMatch,
  AggregateGroupListMatch$inboundSchema,
} from "./aggregate-group-list-match.js";
import { Band, Band$inboundSchema } from "./band.js";
import { Decision, Decision$inboundSchema } from "./decision.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Flow, Flow$inboundSchema } from "./flow.js";
import { Impact, Impact$inboundSchema } from "./impact.js";
import { Lane, Lane$inboundSchema } from "./lane.js";
import { ReasonCode, ReasonCode$inboundSchema } from "./reason-code.js";
import {
  Recommendation,
  Recommendation$inboundSchema,
} from "./recommendation.js";

/**
 * One group's count in one bucket. It holds each grouped dimension the counted assessments had a value for: a pending first answer has no decision, recommendation or band; an answer that fired no reason, listed no incomplete lane, matched no list entry or whose IP has no known country or ASN leaves that dimension out.
 */
export type AggregateGroup = {
  /**
   * An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.
   */
  decision?: Decision | undefined;
  /**
   * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
   */
  flow?: Flow | undefined;
  /**
   * The recommended action: allow, step_up or review. Your application applies it.
   */
  recommendation?: Recommendation | undefined;
  band?: Band | undefined;
  /**
   * The list action captured with the first answer. none means no matching entry was found. For retained_first_answers an absent field means the older assessment did not capture list state; this remains a separate group.
   */
  listMatch?: AggregateGroupListMatch | undefined;
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
  count: number;
};

/** @internal */
export const AggregateGroup$inboundSchema: z.ZodMiniType<
  AggregateGroup,
  unknown
> = z.pipe(
  z.object({
    decision: types.optional(Decision$inboundSchema),
    flow: types.optional(Flow$inboundSchema),
    recommendation: types.optional(Recommendation$inboundSchema),
    band: types.optional(Band$inboundSchema),
    list_match: types.optional(AggregateGroupListMatch$inboundSchema),
    reason: types.optional(ReasonCode$inboundSchema),
    impact: types.optional(Impact$inboundSchema),
    lane: types.optional(Lane$inboundSchema),
    country: types.optional(types.string()),
    asn: types.optional(types.number()),
    count: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "list_match": "listMatch",
    });
  }),
);

export function aggregateGroupFromJSON(
  jsonString: string,
): SafeParseResult<AggregateGroup, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AggregateGroup$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AggregateGroup' from JSON`,
  );
}
