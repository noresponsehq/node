import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Action = {
  Allow: "allow",
  Block: "block",
} as const;
export type Action = OpenEnum<typeof Action>;

/** @internal */
export const Action$inboundSchema: z.ZodMiniType<Action, unknown> = openEnums
  .inboundSchema(Action);
