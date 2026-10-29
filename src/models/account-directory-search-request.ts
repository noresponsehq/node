import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

/**
 * Bounded distinct-account search for a single authenticated workspace/environment. Email matches any retained admitted assessment of an account, using assessment search's canonical mailbox rules. No assessment history download is required.
 */
export type AccountDirectorySearchRequest = {
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId?: string | undefined;
  /**
   * Assessments of every account that one of its retained admitted assessments sent this mailbox as identifiers.email, matched as lists match an email entry: case-insensitive, a +tag removed and, at gmail.com and googlemail.com, the dots of the local part ignored. Only assessments stored since email list matching began carry the mailbox. An address that is not a valid mailbox is refused with 400.
   */
  email?: string | undefined;
  limit?: number | undefined;
  /**
   * Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged.
   */
  cursor?: string | undefined;
};

/** @internal */
export type AccountDirectorySearchRequest$Outbound = {
  account_id?: string | undefined;
  email?: string | undefined;
  limit: number;
  cursor?: string | undefined;
};

/** @internal */
export const AccountDirectorySearchRequest$outboundSchema: z.ZodMiniType<
  AccountDirectorySearchRequest$Outbound,
  AccountDirectorySearchRequest
> = z.pipe(
  z.object({
    accountId: z.optional(z.string()),
    email: z.optional(z.string()),
    limit: z._default(z.int(), 25),
    cursor: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
    });
  }),
);

export function accountDirectorySearchRequestToJSON(
  accountDirectorySearchRequest: AccountDirectorySearchRequest,
): string {
  return JSON.stringify(
    AccountDirectorySearchRequest$outboundSchema.parse(
      accountDirectorySearchRequest,
    ),
  );
}
