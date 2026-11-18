import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft. supplied_handle is a handle on the person row; supplied_username is an account at the person's platform-free username, which alone makes a possible match; source_fact is an account a profile found by the person's lookups lists.
 */
export const ScreeningMatchEvidenceKind = {
  Email: "email",
  Phone: "phone",
  SuppliedHandle: "supplied_handle",
  SuppliedUsername: "supplied_username",
  SourceFact: "source_fact",
  Name: "name",
  Company: "company",
  City: "city",
  School: "school",
} as const;
/**
 * What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft. supplied_handle is a handle on the person row; supplied_username is an account at the person's platform-free username, which alone makes a possible match; source_fact is an account a profile found by the person's lookups lists.
 */
export type ScreeningMatchEvidenceKind = OpenEnum<
  typeof ScreeningMatchEvidenceKind
>;

/** @internal */
export const ScreeningMatchEvidenceKind$inboundSchema: z.ZodMiniType<
  ScreeningMatchEvidenceKind,
  unknown
> = openEnums.inboundSchema(ScreeningMatchEvidenceKind);
