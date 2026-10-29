import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Conclusion, Conclusion$inboundSchema } from "./conclusion.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type Resolution = {
  reviewVersion: number;
  riskVersion: number;
  assessmentVersion: number;
  assessmentId: string;
  conclusion: Conclusion;
  note: string;
  createdBy: string;
  createdAt: string;
};

/** @internal */
export const Resolution$inboundSchema: z.ZodMiniType<Resolution, unknown> = z
  .pipe(
    z.object({
      review_version: types.number(),
      risk_version: types.number(),
      assessment_version: types.number(),
      assessment_id: types.string(),
      conclusion: Conclusion$inboundSchema,
      note: types.string(),
      created_by: types.string(),
      created_at: types.string(),
    }),
    z.transform((v) => {
      return remap$(v, {
        "review_version": "reviewVersion",
        "risk_version": "riskVersion",
        "assessment_version": "assessmentVersion",
        "assessment_id": "assessmentId",
        "created_by": "createdBy",
        "created_at": "createdAt",
      });
    }),
  );

export function resolutionFromJSON(
  jsonString: string,
): SafeParseResult<Resolution, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Resolution$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Resolution' from JSON`,
  );
}
