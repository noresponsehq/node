import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ReviewSubjectKind = {
  Account: "account",
  Assessment: "assessment",
  IssuedCredential: "issued_credential",
} as const;
export type ReviewSubjectKind = OpenEnum<typeof ReviewSubjectKind>;

/** @internal */
export const ReviewSubjectKind$inboundSchema: z.ZodMiniType<
  ReviewSubjectKind,
  unknown
> = openEnums.inboundSchema(ReviewSubjectKind);
/** @internal */
export const ReviewSubjectKind$outboundSchema: z.ZodMiniType<
  string,
  ReviewSubjectKind
> = openEnums.outboundSchema(ReviewSubjectKind);
