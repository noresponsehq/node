import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ResultStatus = {
  NoChange: "no_change",
  ProposalRequiresReview: "proposal_requires_review",
} as const;
export type ResultStatus = OpenEnum<typeof ResultStatus>;

/** @internal */
export const ResultStatus$inboundSchema: z.ZodMiniType<ResultStatus, unknown> =
  openEnums.inboundSchema(ResultStatus);
