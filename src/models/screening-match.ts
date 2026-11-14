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
   * How sure the screening is that a profile is the person's, from its evidence: confirmed is a handle on the person row, or two or more hard identifiers (email, phone, a supplied handle, or a fact an existing source returned); probable is one identifier beyond the name; possible is the name alone.
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
