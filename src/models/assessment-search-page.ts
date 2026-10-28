import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AssessmentRevision,
  AssessmentRevision$inboundSchema,
} from "./assessment-revision.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * A bounded page of latest assessment revisions, newest creation first. Each revision identifies the exact result found; no current account risk is attached.
 */
export type AssessmentSearchPage = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  items: Array<AssessmentRevision>;
  /**
   * Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged.
   */
  nextCursor?: string | undefined;
  /**
   * The calling workspace's configured retention period in days. Default 365 (12 months), which is also the maximum: a workspace may only shorten it, to at least 1 day. Each record expires from its own created_at; see assessment expires_at.
   */
  retentionDays: number;
};

/** @internal */
export const AssessmentSearchPage$inboundSchema: z.ZodMiniType<
  AssessmentSearchPage,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    items: z.array(AssessmentRevision$inboundSchema),
    next_cursor: types.optional(types.string()),
    retention_days: z._default(types.number(), 365),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "next_cursor": "nextCursor",
      "retention_days": "retentionDays",
    });
  }),
);

export function assessmentSearchPageFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentSearchPage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentSearchPage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentSearchPage' from JSON`,
  );
}
