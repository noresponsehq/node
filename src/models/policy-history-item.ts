import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Publication, Publication$inboundSchema } from "./publication.js";
import { Settings, Settings$inboundSchema } from "./settings.js";

export type PolicyHistoryItem = {
  /**
   * One environment's settings: how long its assessments are kept, and for each flow the risk thresholds that decide it and the depth a request that names none is served at, and the sources it refuses. Live and test each have their own. A flow without thresholds of its own uses account_creation's (inherits_account_creation). Every change is recorded in the audit log as settings.updated, with who made it.
   */
  settings: Settings;
  /**
   * Capture time, not a backfilled activation time. Absent only for the current configuration before its first capture.
   */
  recordedAt?: string | undefined;
  changeReason?: string | undefined;
  restoredFrom?: number | undefined;
  /**
   * Immutable publication provenance remains in policy history after evaluation evidence expires. SHA-256 values identify the frozen manifest, evaluator semantic input, cohort, and canonical result separately.
   */
  evaluation?: Publication | undefined;
};

/** @internal */
export const PolicyHistoryItem$inboundSchema: z.ZodMiniType<
  PolicyHistoryItem,
  unknown
> = z.pipe(
  z.object({
    settings: Settings$inboundSchema,
    recorded_at: types.optional(types.string()),
    change_reason: types.optional(types.string()),
    restored_from: types.optional(types.number()),
    evaluation: types.optional(Publication$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "recorded_at": "recordedAt",
      "change_reason": "changeReason",
      "restored_from": "restoredFrom",
    });
  }),
);

export function policyHistoryItemFromJSON(
  jsonString: string,
): SafeParseResult<PolicyHistoryItem, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PolicyHistoryItem$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PolicyHistoryItem' from JSON`,
  );
}
