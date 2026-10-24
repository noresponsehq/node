import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
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

export type AccountRiskReason = {
  /**
   * A stable reason code. New codes may appear; ignore any you do not know.
   */
  code: ReasonCode;
  weight: number;
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
  weight: types.number(),
  identifier: types.optional(ReasonIdentifier$inboundSchema),
});
/** @internal */
export type AccountRiskReason$Outbound = {
  code: string;
  weight: number;
  identifier?: string | undefined;
};

/** @internal */
export const AccountRiskReason$outboundSchema: z.ZodMiniType<
  AccountRiskReason$Outbound,
  AccountRiskReason
> = z.object({
  code: ReasonCode$outboundSchema,
  weight: z.int(),
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
