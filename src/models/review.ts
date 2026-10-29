import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Priority, Priority$inboundSchema } from "./priority.js";
import { Resolution, Resolution$inboundSchema } from "./resolution.js";
import { ReviewStatus, ReviewStatus$inboundSchema } from "./review-status.js";

export type Review = {
  id: string;
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  status: ReviewStatus;
  priority: Priority;
  assignee?: string | undefined;
  version: number;
  openedRiskVersion: number;
  currentRiskVersion: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  resolution?: Resolution | undefined;
  /**
   * Immutable workspace member ID. assignee is the historical display identity captured at assignment.
   */
  assigneePrincipalId?: string | undefined;
};

/** @internal */
export const Review$inboundSchema: z.ZodMiniType<Review, unknown> = z.pipe(
  z.object({
    id: types.string(),
    account_id: types.string(),
    status: ReviewStatus$inboundSchema,
    priority: Priority$inboundSchema,
    assignee: types.optional(types.string()),
    version: types.number(),
    opened_risk_version: types.number(),
    current_risk_version: types.number(),
    created_by: types.string(),
    updated_by: types.string(),
    created_at: types.string(),
    updated_at: types.string(),
    expires_at: types.string(),
    resolution: types.optional(Resolution$inboundSchema),
    assignee_principal_id: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "account_id": "accountId",
      "opened_risk_version": "openedRiskVersion",
      "current_risk_version": "currentRiskVersion",
      "created_by": "createdBy",
      "updated_by": "updatedBy",
      "created_at": "createdAt",
      "updated_at": "updatedAt",
      "expires_at": "expiresAt",
      "assignee_principal_id": "assigneePrincipalId",
    });
  }),
);

export function reviewFromJSON(
  jsonString: string,
): SafeParseResult<Review, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Review$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Review' from JSON`,
  );
}
