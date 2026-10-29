import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Immutable publication provenance remains in policy history after evaluation evidence expires. SHA-256 values identify the frozen manifest, evaluator semantic input, cohort, and canonical result separately.
 */
export type Publication = {
  manifestSha256: string;
  inputSha256: string;
  cohortSha256: string;
  resultSha256: string;
  evaluatorSha256: string;
  evaluationId: string;
  evaluatorVersion: "identity-threshold-evaluator-v2";
  buildVersion: string;
  capturedAt: string;
  publishedAt: string;
};

/** @internal */
export const Publication$inboundSchema: z.ZodMiniType<Publication, unknown> = z
  .pipe(
    z.object({
      manifest_sha256: types.string(),
      input_sha256: types.string(),
      cohort_sha256: types.string(),
      result_sha256: types.string(),
      evaluator_sha256: types.string(),
      evaluation_id: types.string(),
      evaluator_version: types.literal("identity-threshold-evaluator-v2"),
      build_version: types.string(),
      captured_at: types.string(),
      published_at: types.string(),
    }),
    z.transform((v) => {
      return remap$(v, {
        "manifest_sha256": "manifestSha256",
        "input_sha256": "inputSha256",
        "cohort_sha256": "cohortSha256",
        "result_sha256": "resultSha256",
        "evaluator_sha256": "evaluatorSha256",
        "evaluation_id": "evaluationId",
        "evaluator_version": "evaluatorVersion",
        "build_version": "buildVersion",
        "captured_at": "capturedAt",
        "published_at": "publishedAt",
      });
    }),
  );

export function publicationFromJSON(
  jsonString: string,
): SafeParseResult<Publication, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Publication$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Publication' from JSON`,
  );
}
