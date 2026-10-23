import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AssessmentDeletionAccount = {
  /**
   * The account_id of the deleted assessment.
   */
  id: string;
  /**
   * The assessment the account's current risk now comes from. Absent when the account has no assessment with a decision left, and GET /v1/accounts/{account_id} then answers 404.
   */
  currentAssessmentId?: string | undefined;
};

/** @internal */
export const AssessmentDeletionAccount$inboundSchema: z.ZodMiniType<
  AssessmentDeletionAccount,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    current_assessment_id: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "current_assessment_id": "currentAssessmentId",
    });
  }),
);

export function assessmentDeletionAccountFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentDeletionAccount, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentDeletionAccount$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentDeletionAccount' from JSON`,
  );
}
