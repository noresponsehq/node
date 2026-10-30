import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Terminal for the account's assessments created at or before deleted_at in the receiving endpoint's environment: delete what you hold from them and ignore later-arriving updates of them. deleted_at is no earlier than the creation of any assessment it erased. An assessment created after it belongs to the account assessed again: keep it, even when this event arrives after it.
 */
export type AccountDeleted = {
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  /**
   * How many assessments the erasure deleted.
   */
  assessmentsDeleted: number;
  /**
   * When the erasure took effect, equal to deleted_at in the DELETE answer.
   */
  deletedAt: string;
};

/** @internal */
export const AccountDeleted$inboundSchema: z.ZodMiniType<
  AccountDeleted,
  unknown
> = z.pipe(
  z.object({
    account_id: types.string(),
    assessments_deleted: types.number(),
    deleted_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "account_id": "accountId",
      "assessments_deleted": "assessmentsDeleted",
      "deleted_at": "deletedAt",
    });
  }),
);
/** @internal */
export type AccountDeleted$Outbound = {
  account_id: string;
  assessments_deleted: number;
  deleted_at: string;
};

/** @internal */
export const AccountDeleted$outboundSchema: z.ZodMiniType<
  AccountDeleted$Outbound,
  AccountDeleted
> = z.pipe(
  z.object({
    accountId: z.string(),
    assessmentsDeleted: z.int(),
    deletedAt: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      assessmentsDeleted: "assessments_deleted",
      deletedAt: "deleted_at",
    });
  }),
);

export function accountDeletedToJSON(accountDeleted: AccountDeleted): string {
  return JSON.stringify(AccountDeleted$outboundSchema.parse(accountDeleted));
}
export function accountDeletedFromJSON(
  jsonString: string,
): SafeParseResult<AccountDeleted, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountDeleted$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountDeleted' from JSON`,
  );
}
