import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  ReviewSubjectKind,
  ReviewSubjectKind$outboundSchema,
} from "./review-subject-kind.js";

/**
 * An assessment link also requires assessment_id and assessment_version; an issued_credential link also requires credential_id. Every reference must belong to account_id in this environment. Other kinds reject those fields.
 */
export type ReviewSubjectRequest = {
  kind: ReviewSubjectKind;
  accountId: string;
  assessmentId?: string | undefined;
  assessmentVersion?: number | undefined;
  credentialId?: string | undefined;
  reason: string;
  expectedVersion: number;
};

/** @internal */
export type ReviewSubjectRequest$Outbound = {
  kind: string;
  account_id: string;
  assessment_id?: string | undefined;
  assessment_version?: number | undefined;
  credential_id?: string | undefined;
  reason: string;
  expected_version: number;
};

/** @internal */
export const ReviewSubjectRequest$outboundSchema: z.ZodMiniType<
  ReviewSubjectRequest$Outbound,
  ReviewSubjectRequest
> = z.pipe(
  z.object({
    kind: ReviewSubjectKind$outboundSchema,
    accountId: z.string(),
    assessmentId: z.optional(z.string()),
    assessmentVersion: z.optional(z.int()),
    credentialId: z.optional(z.string()),
    reason: z.string(),
    expectedVersion: z.int(),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      assessmentId: "assessment_id",
      assessmentVersion: "assessment_version",
      credentialId: "credential_id",
      expectedVersion: "expected_version",
    });
  }),
);

export function reviewSubjectRequestToJSON(
  reviewSubjectRequest: ReviewSubjectRequest,
): string {
  return JSON.stringify(
    ReviewSubjectRequest$outboundSchema.parse(reviewSubjectRequest),
  );
}
