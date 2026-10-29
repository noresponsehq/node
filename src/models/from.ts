import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const From = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
  Block: "block",
  Held: "held",
} as const;
export type From = OpenEnum<typeof From>;

/** @internal */
export const From$inboundSchema: z.ZodMiniType<From, unknown> = openEnums
  .inboundSchema(From);
