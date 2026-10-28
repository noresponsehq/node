import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * Which answer of each assessment the filters describe: latest, the latest stored revision, or first, the first answer, as served when the assessment was first answered (POST /v1/assessments/aggregate counts first answers). A cell of an aggregate drills down to POST /v1/assessments/search with the same filters, revision first and the cell's bucket as from and to.
 */
export const AnswerRevision = {
  Latest: "latest",
  First: "first",
} as const;
/**
 * Which answer of each assessment the filters describe: latest, the latest stored revision, or first, the first answer, as served when the assessment was first answered (POST /v1/assessments/aggregate counts first answers). A cell of an aggregate drills down to POST /v1/assessments/search with the same filters, revision first and the cell's bucket as from and to.
 */
export type AnswerRevision = ClosedEnum<typeof AnswerRevision>;

/** @internal */
export const AnswerRevision$outboundSchema: z.ZodMiniEnum<
  typeof AnswerRevision
> = z.enum(AnswerRevision);
