import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

export const ListPeopleRole = {
  Guest: "guest",
  Crew: "crew",
  Vendor: "vendor",
  Press: "press",
  Unstated: "unstated",
} as const;
export type ListPeopleRole = ClosedEnum<typeof ListPeopleRole>;

/** @internal */
export const ListPeopleRole$outboundSchema: z.ZodMiniEnum<
  typeof ListPeopleRole
> = z.enum(ListPeopleRole);
