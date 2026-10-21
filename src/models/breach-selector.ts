import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The submitted identifier a breach table matched on: email or username. Phone and name are not breach selectors.
 */
export const BreachSelector = {
  Email: "email",
  Username: "username",
  Ip: "ip",
} as const;
/**
 * The submitted identifier a breach table matched on: email or username. Phone and name are not breach selectors.
 */
export type BreachSelector = OpenEnum<typeof BreachSelector>;

/** @internal */
export const BreachSelector$inboundSchema: z.ZodMiniType<
  BreachSelector,
  unknown
> = openEnums.inboundSchema(BreachSelector);
