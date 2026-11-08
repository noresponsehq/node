import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AttendeeDecision,
  AttendeeDecision$inboundSchema,
} from "./attendee-decision.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * One recorded decision.
 */
export type AttendeeReview = {
  id: string;
  decision: AttendeeDecision;
  note?: string | undefined;
  createdBy: string;
  createdAt: string;
};

/** @internal */
export const AttendeeReview$inboundSchema: z.ZodMiniType<
  AttendeeReview,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    decision: AttendeeDecision$inboundSchema,
    note: types.optional(types.string()),
    created_by: types.string(),
    created_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_by": "createdBy",
      "created_at": "createdAt",
    });
  }),
);

export function attendeeReviewFromJSON(
  jsonString: string,
): SafeParseResult<AttendeeReview, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttendeeReview$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttendeeReview' from JSON`,
  );
}
