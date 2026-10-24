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

export type RiskReason = {
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
export const RiskReason$inboundSchema: z.ZodMiniType<RiskReason, unknown> = z
  .object({
    code: ReasonCode$inboundSchema,
    weight: types.number(),
    identifier: types.optional(ReasonIdentifier$inboundSchema),
  });
/** @internal */
export type RiskReason$Outbound = {
  code: string;
  weight: number;
  identifier?: string | undefined;
};

/** @internal */
export const RiskReason$outboundSchema: z.ZodMiniType<
  RiskReason$Outbound,
  RiskReason
> = z.object({
  code: ReasonCode$outboundSchema,
  weight: z.int(),
  identifier: z.optional(ReasonIdentifier$outboundSchema),
});

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
