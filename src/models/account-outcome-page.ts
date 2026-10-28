import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountOutcome,
  AccountOutcome$inboundSchema,
} from "./account-outcome.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * List retained account reports, newest first. The page-level effective outcome id names the current report. Each receipt preserves the effective report and risk version from its original write. Page with the returned cursor.
 */
export type AccountOutcomePage = {
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  items: Array<AccountOutcome>;
  /**
   * Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged.
   */
  nextCursor?: string | undefined;
  /**
   * Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.
   */
  effectiveOutcomeId?: string | undefined;
};

/** @internal */
export const AccountOutcomePage$inboundSchema: z.ZodMiniType<
  AccountOutcomePage,
  unknown
> = z.pipe(
  z.object({
    account_id: types.string(),
    items: z.array(AccountOutcome$inboundSchema),
    next_cursor: types.optional(types.string()),
    effective_outcome_id: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "account_id": "accountId",
      "next_cursor": "nextCursor",
      "effective_outcome_id": "effectiveOutcomeId",
    });
  }),
);

export function accountOutcomePageFromJSON(
  jsonString: string,
): SafeParseResult<AccountOutcomePage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountOutcomePage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountOutcomePage' from JSON`,
  );
}
