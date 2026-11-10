import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  FailureReason,
  FailureReason$inboundSchema,
} from "./failure-reason.js";
import {
  IdentifierSearchKind,
  IdentifierSearchKind$inboundSchema,
} from "./identifier-search-kind.js";
import { Lane, Lane$inboundSchema } from "./lane.js";
import {
  ScreeningLookupCheckStatus,
  ScreeningLookupCheckStatus$inboundSchema,
} from "./screening-lookup-check-status.js";

/**
 * What came of one lane of the lookups for one identifier.
 */
export type ScreeningLookupCheck = {
  identifier: IdentifierSearchKind;
  /**
   * An evidence lane: accounts (account presence for email and username), phone, breach, domain (the email domain's registration) and ip.
   */
  lane: Lane;
  /**
   * found: a source found the identifier. not_found: every source answered and none found it. partial: the sources that answered found nothing and the others did not answer. not_covered: no source answered. A lookup that failed reads partial or not_covered, not not_found.
   */
  status: ScreeningLookupCheckStatus;
  /**
   * Sources asked: none when no source could be, as when the source is stopped or your workspace refuses it.
   */
  sources: number;
  /**
   * Sources that gave a definite answer.
   */
  answered: number;
  /**
   * Sources that found the identifier.
   */
  found: number;
  /**
   * Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.
   */
  reason?: FailureReason | undefined;
};

/** @internal */
export const ScreeningLookupCheck$inboundSchema: z.ZodMiniType<
  ScreeningLookupCheck,
  unknown
> = z.object({
  identifier: IdentifierSearchKind$inboundSchema,
  lane: Lane$inboundSchema,
  status: ScreeningLookupCheckStatus$inboundSchema,
  sources: types.number(),
  answered: types.number(),
  found: types.number(),
  reason: types.optional(FailureReason$inboundSchema),
});

export function screeningLookupCheckFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningLookupCheck, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningLookupCheck$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningLookupCheck' from JSON`,
  );
}
