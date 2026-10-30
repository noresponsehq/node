import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Terminal. Nothing to fetch; the consumer deletes its state for assessment_id.
 */
export type AssessmentExpired = {
  /**
   * Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.
   */
  assessmentId: string;
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  /**
   * The last served version: expiry is not a revision.
   */
  assessmentVersion: number;
  status: "expired";
  changeReason: "expired";
};

/** @internal */
export const AssessmentExpired$inboundSchema: z.ZodMiniType<
  AssessmentExpired,
  unknown
> = z.pipe(
  z.object({
    assessment_id: types.string(),
    account_id: types.string(),
    assessment_version: types.number(),
    status: types.literal("expired"),
    change_reason: types.literal("expired"),
  }),
  z.transform((v) => {
    return remap$(v, {
      "assessment_id": "assessmentId",
      "account_id": "accountId",
      "assessment_version": "assessmentVersion",
      "change_reason": "changeReason",
    });
  }),
);
/** @internal */
export type AssessmentExpired$Outbound = {
  assessment_id: string;
  account_id: string;
  assessment_version: number;
  status: "expired";
  change_reason: "expired";
};

/** @internal */
export const AssessmentExpired$outboundSchema: z.ZodMiniType<
  AssessmentExpired$Outbound,
  AssessmentExpired
> = z.pipe(
  z.object({
    assessmentId: z.string(),
    accountId: z.string(),
    assessmentVersion: z.int(),
    status: z.literal("expired"),
    changeReason: z.literal("expired"),
  }),
  z.transform((v) => {
    return remap$(v, {
      assessmentId: "assessment_id",
      accountId: "account_id",
      assessmentVersion: "assessment_version",
      changeReason: "change_reason",
    });
  }),
);

export function assessmentExpiredToJSON(
  assessmentExpired: AssessmentExpired,
): string {
  return JSON.stringify(
    AssessmentExpired$outboundSchema.parse(assessmentExpired),
  );
}
export function assessmentExpiredFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentExpired, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentExpired$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentExpired' from JSON`,
  );
}
