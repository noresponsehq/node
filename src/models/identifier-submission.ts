import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type IdentifierSubmission = {
  /**
   * The original value submitted in assessment_id. Under canonical or mailbox matching the two accounts' values can differ.
   */
  value: string;
  /**
   * Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.
   */
  assessmentId: string;
  /**
   * When assessment_id was created.
   */
  submittedAt: string;
};

/** @internal */
export const IdentifierSubmission$inboundSchema: z.ZodMiniType<
  IdentifierSubmission,
  unknown
> = z.pipe(
  z.object({
    value: types.string(),
    assessment_id: types.string(),
    submitted_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "assessment_id": "assessmentId",
      "submitted_at": "submittedAt",
    });
  }),
);

export function identifierSubmissionFromJSON(
  jsonString: string,
): SafeParseResult<IdentifierSubmission, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => IdentifierSubmission$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'IdentifierSubmission' from JSON`,
  );
}
