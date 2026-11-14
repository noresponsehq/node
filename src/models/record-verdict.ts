import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Verdict, Verdict$inboundSchema } from "./verdict.js";

/**
 * A recorded verdict on one record. A later verdict on the same record replaces it.
 */
export type RecordVerdict = {
  recordId: string;
  /**
   * A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.
   */
  verdict: Verdict;
  decidedBy: string;
  decidedAt: string;
};

/** @internal */
export const RecordVerdict$inboundSchema: z.ZodMiniType<
  RecordVerdict,
  unknown
> = z.pipe(
  z.object({
    record_id: types.string(),
    verdict: Verdict$inboundSchema,
    decided_by: types.string(),
    decided_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "record_id": "recordId",
      "decided_by": "decidedBy",
      "decided_at": "decidedAt",
    });
  }),
);

export function recordVerdictFromJSON(
  jsonString: string,
): SafeParseResult<RecordVerdict, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RecordVerdict$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RecordVerdict' from JSON`,
  );
}
