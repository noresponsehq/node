import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AssessmentSearchItem,
  AssessmentSearchItem$inboundSchema,
} from "./assessment-search-item.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * A bounded page of latest assessment revisions, newest creation first, with how many assessments match the filters. Each item is the revision found and its first answer's decision; no current account risk is attached.
 */
export type AssessmentSearchPage = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  items: Array<AssessmentSearchItem>;
  /**
   * How many assessments match the filters over every page, counted when this page was read: exact up to 10000. At 10000 or more it is 10000 and total_capped is true. The cursor does not change it; a later page can count differently, as results are live.
   */
  total: number;
  /**
   * True when at least 10000 assessments match, so total is 10000 and not the exact count.
   */
  totalCapped: boolean;
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
    items: z.array(AssessmentSearchItem$inboundSchema),
    total: types.number(),
    total_capped: types.boolean(),
    next_cursor: types.optional(types.string()),
    retention_days: z._default(types.number(), 365),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "total_capped": "totalCapped",
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
