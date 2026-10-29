import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ListChangeState = {
  Propagating: "propagating",
  Completed: "completed",
} as const;
export type ListChangeState = OpenEnum<typeof ListChangeState>;

/** @internal */
export const ListChangeState$inboundSchema: z.ZodMiniType<
  ListChangeState,
  unknown
> = openEnums.inboundSchema(ListChangeState);
