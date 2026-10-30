import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountBindingActor,
  AccountBindingActor$inboundSchema,
} from "./account-binding-actor.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Binding appends an assessment revision and preserves earlier versions. Continuations use the same assessment. Erasing either the provisional or canonical name erases the canonical account, including the bound assessment.
 */
export type AccountBinding = {
  /**
   * Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.
   */
  assessmentId: string;
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  provisionalAccountId: string;
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  /**
   * Monotonic revision of this assessment. 1 on the synchronous answer; each material change while the assessment is served (an async continuation settling a source, a change of recommendation, confidence or status) increments it. Expiry does not increment it: an expired assessment is gone, not revised, and the expiry webhook carries the last served version.
   */
  assessmentVersion: number;
  createdAt: string;
  actor: AccountBindingActor;
};

/** @internal */
export const AccountBinding$inboundSchema: z.ZodMiniType<
  AccountBinding,
  unknown
> = z.pipe(
  z.object({
    assessment_id: types.string(),
    provisional_account_id: types.string(),
    account_id: types.string(),
    assessment_version: types.number(),
    created_at: types.string(),
    actor: AccountBindingActor$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "assessment_id": "assessmentId",
      "provisional_account_id": "provisionalAccountId",
      "account_id": "accountId",
      "assessment_version": "assessmentVersion",
      "created_at": "createdAt",
    });
  }),
);

export function accountBindingFromJSON(
  jsonString: string,
): SafeParseResult<AccountBinding, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountBinding$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountBinding' from JSON`,
  );
}
