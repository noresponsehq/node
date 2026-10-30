import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Priority, Priority$outboundSchema } from "./priority.js";

export type ReviewCreateRequest = {
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  priority?: Priority | undefined;
  assignee?: string | undefined;
};

/** @internal */
export type ReviewCreateRequest$Outbound = {
  account_id: string;
  priority?: string | undefined;
  assignee?: string | undefined;
};

/** @internal */
export const ReviewCreateRequest$outboundSchema: z.ZodMiniType<
  ReviewCreateRequest$Outbound,
  ReviewCreateRequest
> = z.pipe(
  z.object({
    accountId: z.string(),
    priority: z.optional(Priority$outboundSchema),
    assignee: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
    });
  }),
);

export function reviewCreateRequestToJSON(
  reviewCreateRequest: ReviewCreateRequest,
): string {
  return JSON.stringify(
    ReviewCreateRequest$outboundSchema.parse(reviewCreateRequest),
  );
}
