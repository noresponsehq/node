import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * found_by: what found the record, which sets where its likelihood starts. agrees: a value the record shares with what the investigator gave or with a joined record. clashes: a birth date, full name, gender or country that differs from theirs.
 */
export const RecordEvidenceSignal = {
  FoundBy: "found_by",
  Agrees: "agrees",
  Clashes: "clashes",
} as const;
/**
 * found_by: what found the record, which sets where its likelihood starts. agrees: a value the record shares with what the investigator gave or with a joined record. clashes: a birth date, full name, gender or country that differs from theirs.
 */
export type RecordEvidenceSignal = OpenEnum<typeof RecordEvidenceSignal>;

/** @internal */
export const RecordEvidenceSignal$inboundSchema: z.ZodMiniType<
  RecordEvidenceSignal,
  unknown
> = openEnums.inboundSchema(RecordEvidenceSignal);
