import * as z from "zod/v4-mini";
import {
  PersonDecision,
  PersonDecision$outboundSchema,
} from "./person-decision.js";

/**
 * Records a decision on a person.
 */
export type PersonReviewRequest = {
  decision: PersonDecision;
  /**
   * Why, for the venue team and later reviewers.
   */
  note?: string | undefined;
};

/** @internal */
export type PersonReviewRequest$Outbound = {
  decision: string;
  note?: string | undefined;
};

/** @internal */
export const PersonReviewRequest$outboundSchema: z.ZodMiniType<
  PersonReviewRequest$Outbound,
  PersonReviewRequest
> = z.object({
  decision: PersonDecision$outboundSchema,
  note: z.optional(z.string()),
});

export function personReviewRequestToJSON(
  personReviewRequest: PersonReviewRequest,
): string {
  return JSON.stringify(
    PersonReviewRequest$outboundSchema.parse(personReviewRequest),
  );
}
