import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PersonDecision,
  PersonDecision$inboundSchema,
} from "./person-decision.js";

/**
 * One recorded decision.
 */
export type PersonReview = {
  id: string;
  decision: PersonDecision;
  note?: string | undefined;
  createdBy: string;
  createdAt: string;
};

/** @internal */
export const PersonReview$inboundSchema: z.ZodMiniType<PersonReview, unknown> =
  z.pipe(
    z.object({
      id: types.string(),
      decision: PersonDecision$inboundSchema,
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

export function personReviewFromJSON(
  jsonString: string,
): SafeParseResult<PersonReview, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonReview$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonReview' from JSON`,
  );
}
