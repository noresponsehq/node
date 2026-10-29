import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  ErasureReceiptTargetName,
  ErasureReceiptTargetName$inboundSchema,
} from "./erasure-receipt-target-name.js";
import {
  ErasureReceiptTargetStatus,
  ErasureReceiptTargetStatus$inboundSchema,
} from "./erasure-receipt-target-status.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type ErasureReceiptTarget = {
  name: ErasureReceiptTargetName;
  status: ErasureReceiptTargetStatus;
  completedAt?: string | undefined;
};

/** @internal */
export const ErasureReceiptTarget$inboundSchema: z.ZodMiniType<
  ErasureReceiptTarget,
  unknown
> = z.pipe(
  z.object({
    name: ErasureReceiptTargetName$inboundSchema,
    status: ErasureReceiptTargetStatus$inboundSchema,
    completed_at: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "completed_at": "completedAt",
    });
  }),
);

export function erasureReceiptTargetFromJSON(
  jsonString: string,
): SafeParseResult<ErasureReceiptTarget, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ErasureReceiptTarget$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ErasureReceiptTarget' from JSON`,
  );
}
