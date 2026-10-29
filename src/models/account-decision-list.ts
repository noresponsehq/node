import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountDecisionSnapshot,
  AccountDecisionSnapshot$inboundSchema,
} from "./account-decision-snapshot.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Page through recorded account decisions.
 */
export type AccountDecisionList = {
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  items: Array<AccountDecisionSnapshot>;
  /**
   * Opaque, expiring cursor bound to the workspace, environment, account and history kind. Absent at the end.
   */
  nextCursor?: string | undefined;
};

/** @internal */
export const AccountDecisionList$inboundSchema: z.ZodMiniType<
  AccountDecisionList,
  unknown
> = z.pipe(
  z.object({
    account_id: types.string(),
    items: z.array(AccountDecisionSnapshot$inboundSchema),
    next_cursor: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "account_id": "accountId",
      "next_cursor": "nextCursor",
    });
  }),
);

export function accountDecisionListFromJSON(
  jsonString: string,
): SafeParseResult<AccountDecisionList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountDecisionList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountDecisionList' from JSON`,
  );
}
