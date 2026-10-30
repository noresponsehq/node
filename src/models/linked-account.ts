import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  SharedIdentifier,
  SharedIdentifier$inboundSchema,
} from "./shared-identifier.js";

export type LinkedAccount = {
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  /**
   * One entry per shared kind, in the order email, phone, username. Each entry uses the strictest basis that links the two accounts: exact, then canonical, then mailbox.
   */
  sharedIdentifiers: Array<SharedIdentifier>;
};

/** @internal */
export const LinkedAccount$inboundSchema: z.ZodMiniType<
  LinkedAccount,
  unknown
> = z.pipe(
  z.object({
    account_id: types.string(),
    shared_identifiers: z.array(SharedIdentifier$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "account_id": "accountId",
      "shared_identifiers": "sharedIdentifiers",
    });
  }),
);

export function linkedAccountFromJSON(
  jsonString: string,
): SafeParseResult<LinkedAccount, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => LinkedAccount$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'LinkedAccount' from JSON`,
  );
}
