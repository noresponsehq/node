import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * anchors_disagree: records found by two of the identifiers you gave clash with each other, so those identifiers may belong to different people.
 */
export const RecordConflictSignal = {
  AnchorsDisagree: "anchors_disagree",
} as const;
/**
 * anchors_disagree: records found by two of the identifiers you gave clash with each other, so those identifiers may belong to different people.
 */
export type RecordConflictSignal = OpenEnum<typeof RecordConflictSignal>;

/** @internal */
export const RecordConflictSignal$inboundSchema: z.ZodMiniType<
  RecordConflictSignal,
  unknown
> = openEnums.inboundSchema(RecordConflictSignal);
