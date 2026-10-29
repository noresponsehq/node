import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  Direction,
  Direction$inboundSchema,
  Direction$outboundSchema,
} from "./direction.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  Impact,
  Impact$inboundSchema,
  Impact$outboundSchema,
} from "./impact.js";
import {
  ReasonCode,
  ReasonCode$inboundSchema,
  ReasonCode$outboundSchema,
} from "./reason-code.js";
import {
  ReasonIdentifier,
  ReasonIdentifier$inboundSchema,
  ReasonIdentifier$outboundSchema,
} from "./reason-identifier.js";

/**
 * One reason that fired. direction is whether it raises or lowers the score, or is neutral (informational, it moves nothing). impact is a coarse band of how much it moves the score: none for a neutral reason, otherwise low, medium or high.
 */
export type RiskReason = {
  /**
   * A stable reason code. New codes may appear; ignore any you do not know.
   */
  code: ReasonCode;
  direction: Direction;
  /**
   * The selected reason's served impact band. Requires reason.
   */
  impact: Impact;
  /**
   * The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint.
   */
  identifier?: ReasonIdentifier | undefined;
  /**
   * The list entry a list_match reason applied. No other reason carries it.
   */
  listEntryId?: string | undefined;
};

/** @internal */
export const RiskReason$inboundSchema: z.ZodMiniType<RiskReason, unknown> = z
  .pipe(
    z.object({
      code: ReasonCode$inboundSchema,
      direction: Direction$inboundSchema,
      impact: Impact$inboundSchema,
      identifier: types.optional(ReasonIdentifier$inboundSchema),
      list_entry_id: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "list_entry_id": "listEntryId",
      });
    }),
  );
/** @internal */
export type RiskReason$Outbound = {
  code: string;
  direction: string;
  impact: string;
  identifier?: string | undefined;
  list_entry_id?: string | undefined;
};

/** @internal */
export const RiskReason$outboundSchema: z.ZodMiniType<
  RiskReason$Outbound,
  RiskReason
> = z.pipe(
  z.object({
    code: ReasonCode$outboundSchema,
    direction: Direction$outboundSchema,
    impact: Impact$outboundSchema,
    identifier: z.optional(ReasonIdentifier$outboundSchema),
    listEntryId: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      listEntryId: "list_entry_id",
    });
  }),
);

export function riskReasonToJSON(riskReason: RiskReason): string {
  return JSON.stringify(RiskReason$outboundSchema.parse(riskReason));
}
export function riskReasonFromJSON(
  jsonString: string,
): SafeParseResult<RiskReason, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskReason$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskReason' from JSON`,
  );
}
