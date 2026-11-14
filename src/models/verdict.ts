import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.
 */
export const Verdict = {
  Joined: "joined",
  Rejected: "rejected",
} as const;
/**
 * A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.
 */
export type Verdict = OpenEnum<typeof Verdict>;

/** @internal */
export const Verdict$inboundSchema: z.ZodMiniType<Verdict, unknown> = openEnums
  .inboundSchema(Verdict);
/** @internal */
export const Verdict$outboundSchema: z.ZodMiniType<string, Verdict> = openEnums
  .outboundSchema(Verdict);
