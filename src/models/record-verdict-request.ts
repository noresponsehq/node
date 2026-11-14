import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Verdict, Verdict$outboundSchema } from "./verdict.js";

/**
 * A reviewer's verdict on whether one of a person's lookup records is theirs.
 */
export type RecordVerdictRequest = {
  /**
   * One of the person's lookup records.
   */
  recordId: string;
  /**
   * A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.
   */
  verdict: Verdict;
};

/** @internal */
export type RecordVerdictRequest$Outbound = {
  record_id: string;
  verdict: string;
};

/** @internal */
export const RecordVerdictRequest$outboundSchema: z.ZodMiniType<
  RecordVerdictRequest$Outbound,
  RecordVerdictRequest
> = z.pipe(
  z.object({
    recordId: z.string(),
    verdict: Verdict$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      recordId: "record_id",
    });
  }),
);

export function recordVerdictRequestToJSON(
  recordVerdictRequest: RecordVerdictRequest,
): string {
  return JSON.stringify(
    RecordVerdictRequest$outboundSchema.parse(recordVerdictRequest),
  );
}
