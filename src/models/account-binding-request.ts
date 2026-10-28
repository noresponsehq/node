import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";

/**
 * One-time association to an opaque stable customer account. The assessment is its natural idempotency key. Repeating the same binding returns its first receipt; a conflicting target is refused. No arbitrary account merging.
 */
export type AccountBindingRequest = {
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
};

/** @internal */
export type AccountBindingRequest$Outbound = {
  account_id: string;
};

/** @internal */
export const AccountBindingRequest$outboundSchema: z.ZodMiniType<
  AccountBindingRequest$Outbound,
  AccountBindingRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
    });
  }),
);

export function accountBindingRequestToJSON(
  accountBindingRequest: AccountBindingRequest,
): string {
  return JSON.stringify(
    AccountBindingRequest$outboundSchema.parse(accountBindingRequest),
  );
}
