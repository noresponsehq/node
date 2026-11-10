import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

export const ListAttendeesRole = {
  Guest: "guest",
  Crew: "crew",
  Vendor: "vendor",
  Press: "press",
  Unstated: "unstated",
} as const;
export type ListAttendeesRole = ClosedEnum<typeof ListAttendeesRole>;

/** @internal */
export const ListAttendeesRole$outboundSchema: z.ZodMiniEnum<
  typeof ListAttendeesRole
> = z.enum(ListAttendeesRole);
