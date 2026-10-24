import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import {
  AssessmentExpired,
  AssessmentExpired$inboundSchema,
  AssessmentExpired$Outbound,
  AssessmentExpired$outboundSchema,
} from "./assessment-expired.js";
import {
  Assessment,
  Assessment$inboundSchema,
  Assessment$Outbound,
  Assessment$outboundSchema,
} from "./assessment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The assessment, or the minimal notice that it expired.
 */
export type AssessmentUpdatedData =
  | (Assessment & { status: "complete" })
  | (Assessment & { status: "partial" })
  | (Assessment & { status: "pending" })
  | AssessmentExpired;

/** @internal */
export const AssessmentUpdatedData$inboundSchema: z.ZodMiniType<
  AssessmentUpdatedData,
  unknown
> = z.union([
  z.intersection(
    Assessment$inboundSchema,
    z.object({ status: z.literal("complete") }),
  ),
  z.intersection(
    Assessment$inboundSchema,
    z.object({ status: z.literal("partial") }),
  ),
  z.intersection(
    Assessment$inboundSchema,
    z.object({ status: z.literal("pending") }),
  ),
  AssessmentExpired$inboundSchema,
]);
/** @internal */
export type AssessmentUpdatedData$Outbound =
  | (Assessment$Outbound & { status: "complete" })
  | (Assessment$Outbound & { status: "partial" })
  | (Assessment$Outbound & { status: "pending" })
  | AssessmentExpired$Outbound;

/** @internal */
export const AssessmentUpdatedData$outboundSchema: z.ZodMiniType<
  AssessmentUpdatedData$Outbound,
  AssessmentUpdatedData
> = z.union([
  z.intersection(
    Assessment$outboundSchema,
    z.object({ status: z.literal("complete") }),
  ),
  z.intersection(
    Assessment$outboundSchema,
    z.object({ status: z.literal("partial") }),
  ),
  z.intersection(
    Assessment$outboundSchema,
    z.object({ status: z.literal("pending") }),
  ),
  AssessmentExpired$outboundSchema,
]);

export function assessmentUpdatedDataToJSON(
  assessmentUpdatedData: AssessmentUpdatedData,
): string {
  return JSON.stringify(
    AssessmentUpdatedData$outboundSchema.parse(assessmentUpdatedData),
  );
}
export function assessmentUpdatedDataFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentUpdatedData, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentUpdatedData$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentUpdatedData' from JSON`,
  );
}
