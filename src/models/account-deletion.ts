import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Body of the 200 answer to DELETE /v1/accounts/{account_id}: the calling workspace's account was erased in the environment of the calling key. Every assessment of the account went, with its revisions, evidence, outcomes and the identity-graph marks its outcomes set, and an assessment that was still running when the call arrived is stopped. Afterwards GET /v1/accounts/{account_id} and GET /v1/assessments/{assessment_id} of each erased assessment answer 404, and the history page is empty. The call is idempotent: a repeat, or an account with nothing to erase, answers 200 with assessments_deleted 0. The account_id can be assessed again later, as a new account.
 */
export type AccountDeletion = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  /**
   * The account_id that was erased.
   */
  id: string;
  deleted: true;
  /**
   * How many assessments this call deleted. 0 when the account had none left, so a repeat answers 0.
   */
  assessmentsDeleted: number;
  /**
   * When the erasure took effect. An assessment of the account begun before this time is refused or stopped.
   */
  deletedAt: string;
};

/** @internal */
export const AccountDeletion$inboundSchema: z.ZodMiniType<
  AccountDeletion,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    id: types.string(),
    deleted: types.literal(true),
    assessments_deleted: types.number(),
    deleted_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "assessments_deleted": "assessmentsDeleted",
      "deleted_at": "deletedAt",
    });
  }),
);

export function accountDeletionFromJSON(
  jsonString: string,
): SafeParseResult<AccountDeletion, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountDeletion$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountDeletion' from JSON`,
  );
}
