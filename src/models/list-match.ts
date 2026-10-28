import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The action of the list entry that decided the account.
 */
export const ListMatch = {
  Block: "block",
  Allow: "allow",
} as const;
/**
 * The action of the list entry that decided the account.
 */
export type ListMatch = OpenEnum<typeof ListMatch>;

/** @internal */
export const ListMatch$inboundSchema: z.ZodMiniType<ListMatch, unknown> =
  openEnums.inboundSchema(ListMatch);
