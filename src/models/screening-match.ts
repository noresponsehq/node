import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ProfileMatchState,
  ProfileMatchState$inboundSchema,
} from "./profile-match-state.js";
import {
  ScreeningMatchEvidence,
  ScreeningMatchEvidence$inboundSchema,
} from "./screening-match-evidence.js";

/**
 * How a profile was matched to the person: the state its evidence earns, and the evidence.
 */
export type ScreeningMatch = {
  /**
   * How sure the screening is that a profile is the person's, from the likelihood its record scores. Confirmed reaches the join bar of 0.9. Probable reaches 0.85, which takes a shared value beyond the one that found the account. Possible is the rest.
   */
  state: ProfileMatchState;
  evidence: Array<ScreeningMatchEvidence>;
};

/** @internal */
export const ScreeningMatch$inboundSchema: z.ZodMiniType<
  ScreeningMatch,
  unknown
> = z.object({
  state: ProfileMatchState$inboundSchema,
  evidence: z.array(ScreeningMatchEvidence$inboundSchema),
});

export function screeningMatchFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningMatch, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningMatch$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningMatch' from JSON`,
  );
}
