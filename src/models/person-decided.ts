import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PersonDecision,
  PersonDecision$inboundSchema,
  PersonDecision$outboundSchema,
} from "./person-decision.js";

/**
 * A reviewer recorded a decision on a person. The decision's note stays in the API. Sent once per recorded review; a person's latest review is its decision, so order by decided_at.
 */
export type PersonDecided = {
  /**
   * The person's group.
   */
  groupId: string;
  /**
   * The person decided on.
   */
  personId: string;
  /**
   * The recorded review.
   */
  reviewId: string;
  decision: PersonDecision;
  /**
   * Who decided: the member's external user id, or the API key's label, as the person's decided_by.
   */
  decidedBy: string;
  /**
   * When the decision was recorded; equal to the event's created_at.
   */
  decidedAt: string;
};

/** @internal */
export const PersonDecided$inboundSchema: z.ZodMiniType<
  PersonDecided,
  unknown
> = z.pipe(
  z.object({
    group_id: types.string(),
    person_id: types.string(),
    review_id: types.string(),
    decision: PersonDecision$inboundSchema,
    decided_by: types.string(),
    decided_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "group_id": "groupId",
      "person_id": "personId",
      "review_id": "reviewId",
      "decided_by": "decidedBy",
      "decided_at": "decidedAt",
    });
  }),
);
/** @internal */
export type PersonDecided$Outbound = {
  group_id: string;
  person_id: string;
  review_id: string;
  decision: string;
  decided_by: string;
  decided_at: string;
};

/** @internal */
export const PersonDecided$outboundSchema: z.ZodMiniType<
  PersonDecided$Outbound,
  PersonDecided
> = z.pipe(
  z.object({
    groupId: z.string(),
    personId: z.string(),
    reviewId: z.string(),
    decision: PersonDecision$outboundSchema,
    decidedBy: z.string(),
    decidedAt: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      groupId: "group_id",
      personId: "person_id",
      reviewId: "review_id",
      decidedBy: "decided_by",
      decidedAt: "decided_at",
    });
  }),
);

export function personDecidedToJSON(personDecided: PersonDecided): string {
  return JSON.stringify(PersonDecided$outboundSchema.parse(personDecided));
}
export function personDecidedFromJSON(
  jsonString: string,
): SafeParseResult<PersonDecided, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonDecided$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonDecided' from JSON`,
  );
}
