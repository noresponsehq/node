import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.
 */
export const Match = {
  Exact: "exact",
  Canonical: "canonical",
  Mailbox: "mailbox",
} as const;
/**
 * exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.
 */
export type Match = OpenEnum<typeof Match>;

/** @internal */
export const Match$inboundSchema: z.ZodMiniType<Match, unknown> = openEnums
  .inboundSchema(Match);
/** @internal */
export const Match$outboundSchema: z.ZodMiniType<string, Match> = openEnums
  .outboundSchema(Match);
