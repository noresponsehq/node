import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The kind of the value: one of the kinds the environment's enrichment setting names.
 */
export const SuggestedSearchKind = {
  Username: "username",
  Email: "email",
  Phone: "phone",
} as const;
/**
 * The kind of the value: one of the kinds the environment's enrichment setting names.
 */
export type SuggestedSearchKind = OpenEnum<typeof SuggestedSearchKind>;

/** @internal */
export const SuggestedSearchKind$inboundSchema: z.ZodMiniType<
  SuggestedSearchKind,
  unknown
> = openEnums.inboundSchema(SuggestedSearchKind);
