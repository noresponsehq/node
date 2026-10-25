import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The submitted email or username whose own search matched the table. A submitted full name is searched as well, and what it finds feeds the identity's reasons rather than this list.
 */
export const BreachSelector = {
  Email: "email",
  Username: "username",
  Ip: "ip",
} as const;
/**
 * The submitted email or username whose own search matched the table. A submitted full name is searched as well, and what it finds feeds the identity's reasons rather than this list.
 */
export type BreachSelector = OpenEnum<typeof BreachSelector>;

/** @internal */
export const BreachSelector$inboundSchema: z.ZodMiniType<
  BreachSelector,
  unknown
> = openEnums.inboundSchema(BreachSelector);
/** @internal */
export const BreachSelector$outboundSchema: z.ZodMiniType<
  string,
  BreachSelector
> = openEnums.outboundSchema(BreachSelector);
