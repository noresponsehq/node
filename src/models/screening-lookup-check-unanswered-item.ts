import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  FailureReason,
  FailureReason$inboundSchema,
} from "./failure-reason.js";

export type ScreeningLookupCheckUnansweredItem = {
  /**
   * The id of the connector that did not answer: breach for the breach search.
   */
  connector: string;
  /**
   * Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.
   */
  reason: FailureReason;
};

/** @internal */
export const ScreeningLookupCheckUnansweredItem$inboundSchema: z.ZodMiniType<
  ScreeningLookupCheckUnansweredItem,
  unknown
> = z.object({
  connector: types.string(),
  reason: FailureReason$inboundSchema,
});

export function screeningLookupCheckUnansweredItemFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningLookupCheckUnansweredItem, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) =>
      ScreeningLookupCheckUnansweredItem$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningLookupCheckUnansweredItem' from JSON`,
  );
}
