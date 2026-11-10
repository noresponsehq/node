import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft.
 */
export const ScreeningMatchEvidenceKind = {
  Email: "email",
  Phone: "phone",
  SuppliedHandle: "supplied_handle",
  SourceFact: "source_fact",
  Name: "name",
  Company: "company",
  City: "city",
  School: "school",
} as const;
/**
 * What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft.
 */
export type ScreeningMatchEvidenceKind = OpenEnum<
  typeof ScreeningMatchEvidenceKind
>;

/** @internal */
export const ScreeningMatchEvidenceKind$inboundSchema: z.ZodMiniType<
  ScreeningMatchEvidenceKind,
  unknown
> = openEnums.inboundSchema(ScreeningMatchEvidenceKind);
