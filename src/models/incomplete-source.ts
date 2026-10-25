import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  IncompleteReason,
  IncompleteReason$inboundSchema,
  IncompleteReason$outboundSchema,
} from "./incomplete-reason.js";
import { Lane, Lane$inboundSchema, Lane$outboundSchema } from "./lane.js";

/**
 * One evidence lane that did not settle, and why. It names a lane, not a source. A lane that missed its deadline is timed_out rather than not_found.
 */
export type IncompleteSource = {
  /**
   * An evidence lane: accounts (account presence for email and username), phone, breach, domain (the email domain's registration) and ip.
   */
  lane: Lane;
  /**
   * Why a lane did not settle. deferred means the lane is asynchronous and still running; a continuation settles it. timed_out means the lane missed its deadline. insufficient_evidence is a settled inconclusive signal rather than an incomplete lane.
   */
  reason: IncompleteReason;
};

/** @internal */
export const IncompleteSource$inboundSchema: z.ZodMiniType<
  IncompleteSource,
  unknown
> = z.object({
  lane: Lane$inboundSchema,
  reason: IncompleteReason$inboundSchema,
});
/** @internal */
export type IncompleteSource$Outbound = {
  lane: string;
  reason: string;
};

/** @internal */
export const IncompleteSource$outboundSchema: z.ZodMiniType<
  IncompleteSource$Outbound,
  IncompleteSource
> = z.object({
  lane: Lane$outboundSchema,
  reason: IncompleteReason$outboundSchema,
});

export function incompleteSourceToJSON(
  incompleteSource: IncompleteSource,
): string {
  return JSON.stringify(
    IncompleteSource$outboundSchema.parse(incompleteSource),
  );
}
export function incompleteSourceFromJSON(
  jsonString: string,
): SafeParseResult<IncompleteSource, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => IncompleteSource$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'IncompleteSource' from JSON`,
  );
}
