import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ReviewSubjectKind,
  ReviewSubjectKind$inboundSchema,
} from "./review-subject-kind.js";

/**
 * A tenant-local investigation link. risk_version is the account risk version captured when the link was added. It does not assert a relationship or change feedback or enforcement.
 */
export type ReviewSubject = {
  id: string;
  kind: ReviewSubjectKind;
  accountId: string;
  assessmentId?: string | undefined;
  assessmentVersion?: number | undefined;
  credentialId?: string | undefined;
  riskVersion: number;
  reason: string;
  createdBy: string;
  createdAt: string;
};

/** @internal */
export const ReviewSubject$inboundSchema: z.ZodMiniType<
  ReviewSubject,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    kind: ReviewSubjectKind$inboundSchema,
    account_id: types.string(),
    assessment_id: types.optional(types.string()),
    assessment_version: types.optional(types.number()),
    credential_id: types.optional(types.string()),
    risk_version: types.number(),
    reason: types.string(),
    created_by: types.string(),
    created_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "account_id": "accountId",
      "assessment_id": "assessmentId",
      "assessment_version": "assessmentVersion",
      "credential_id": "credentialId",
      "risk_version": "riskVersion",
      "created_by": "createdBy",
      "created_at": "createdAt",
    });
  }),
);

export function reviewSubjectFromJSON(
  jsonString: string,
): SafeParseResult<ReviewSubject, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewSubject$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewSubject' from JSON`,
  );
}
