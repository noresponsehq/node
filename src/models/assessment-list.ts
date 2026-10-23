import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AssessmentDetail,
  AssessmentDetail$inboundSchema,
} from "./assessment-detail.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Body of the 200 answer to POST /v1/assessments/query: one page of the calling workspace's unexpired assessments for one account, newest first, each at its latest assessment_version, as its detail; the account's current risk is GET /v1/accounts/{account_id}. Every item's account_id equals the page's. An assessment past its expires_at is not listed. next_cursor is present only when another page exists.
 */
export type AssessmentList = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  items: Array<AssessmentDetail>;
  /**
   * Opaque cursor for the next page, bound to your workspace and the account_id it was issued for. Pass it back unchanged in the next query; a tampered, foreign or expired cursor answers 400 invalid_cursor.
   */
  nextCursor?: string | undefined;
  /**
   * Your current retention period, so a consumer knows how far back history reaches. Every item expires no later than its created_at plus this many days.
   */
  retentionDays: number;
};

/** @internal */
export const AssessmentList$inboundSchema: z.ZodMiniType<
  AssessmentList,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    account_id: types.string(),
    items: z.array(AssessmentDetail$inboundSchema),
    next_cursor: types.optional(types.string()),
    retention_days: z._default(types.number(), 365),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "account_id": "accountId",
      "next_cursor": "nextCursor",
      "retention_days": "retentionDays",
    });
  }),
);

export function assessmentListFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentList' from JSON`,
  );
}
