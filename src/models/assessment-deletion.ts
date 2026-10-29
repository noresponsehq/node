import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AssessmentDeletionAccount,
  AssessmentDeletionAccount$inboundSchema,
} from "./assessment-deletion-account.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Body of the 200 answer to DELETE /v1/assessments/{assessment_id}: one of the calling workspace's assessments was deleted, with its versions, evidence, outcomes and the identity-graph marks its outcomes set. Afterwards GET /v1/assessments/{assessment_id} answers 404 and the assessment leaves the account's history. The account is scored again from what remains: account.current_assessment_id names the assessment GET /v1/accounts/{account_id} now serves its risk from, and is absent when the account has no assessment with a decision left. Deleting an assessment that is already gone answers 404.
 */
export type AssessmentDeletion = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  /**
   * The assessment that was deleted.
   */
  id: string;
  deleted: true;
  account: AssessmentDeletionAccount;
  /**
   * When the deletion took effect.
   */
  deletedAt: string;
  /**
   * Receipt for GET /v1/erasures/{erasure_id}, when durable storage issued one.
   */
  erasureId?: string | undefined;
};

/** @internal */
export const AssessmentDeletion$inboundSchema: z.ZodMiniType<
  AssessmentDeletion,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    id: types.string(),
    deleted: types.literal(true),
    account: AssessmentDeletionAccount$inboundSchema,
    deleted_at: types.string(),
    erasure_id: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "deleted_at": "deletedAt",
      "erasure_id": "erasureId",
    });
  }),
);

export function assessmentDeletionFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentDeletion, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentDeletion$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentDeletion' from JSON`,
  );
}
