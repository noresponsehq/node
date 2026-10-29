import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const ListImpactKind = {
  Email: "email",
  EmailDomain: "email_domain",
} as const;
export type ListImpactKind = OpenEnum<typeof ListImpactKind>;

/** @internal */
export const ListImpactKind$inboundSchema: z.ZodMiniType<
  ListImpactKind,
  unknown
> = openEnums.inboundSchema(ListImpactKind);
