import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningMatchEvidenceKind,
  ScreeningMatchEvidenceKind$inboundSchema,
} from "./screening-match-evidence-kind.js";

/**
 * One identifier that ties a profile to the attendee.
 */
export type ScreeningMatchEvidence = {
  /**
   * What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft.
   */
  kind: ScreeningMatchEvidenceKind;
  /**
   * Where the match was seen, such as the profile field that carried it.
   */
  detail?: string | undefined;
  /**
   * The resolver, collector or analyser that produced a record, by its catalogue name.
   */
  resolver: string;
};

/** @internal */
export const ScreeningMatchEvidence$inboundSchema: z.ZodMiniType<
  ScreeningMatchEvidence,
  unknown
> = z.object({
  kind: ScreeningMatchEvidenceKind$inboundSchema,
  detail: types.optional(types.string()),
  resolver: types.string(),
});

export function screeningMatchEvidenceFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningMatchEvidence, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningMatchEvidence$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningMatchEvidence' from JSON`,
  );
}
