import * as z from "zod/v4-mini";
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
export type AccountRiskReason = {
  /**
   * A stable reason code. New codes may appear; ignore any you do not know.
   */
  code: ReasonCode;
  direction: Direction;
  impact: Impact;
  /**
   * The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint.
   */
  identifier?: ReasonIdentifier | undefined;
};

/** @internal */
export const AccountRiskReason$inboundSchema: z.ZodMiniType<
  AccountRiskReason,
  unknown
> = z.object({
  code: ReasonCode$inboundSchema,
  direction: Direction$inboundSchema,
  impact: Impact$inboundSchema,
  identifier: types.optional(ReasonIdentifier$inboundSchema),
});
/** @internal */
export type AccountRiskReason$Outbound = {
  code: string;
  direction: string;
  impact: string;
  identifier?: string | undefined;
};

/** @internal */
export const AccountRiskReason$outboundSchema: z.ZodMiniType<
  AccountRiskReason$Outbound,
  AccountRiskReason
> = z.object({
  code: ReasonCode$outboundSchema,
  direction: Direction$outboundSchema,
  impact: Impact$outboundSchema,
  identifier: z.optional(ReasonIdentifier$outboundSchema),
});

export function accountRiskReasonToJSON(
  accountRiskReason: AccountRiskReason,
): string {
  return JSON.stringify(
    AccountRiskReason$outboundSchema.parse(accountRiskReason),
  );
}
export function accountRiskReasonFromJSON(
  jsonString: string,
): SafeParseResult<AccountRiskReason, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountRiskReason$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountRiskReason' from JSON`,
  );
}
