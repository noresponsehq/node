import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Which submitted identifier a signal concerns. ip is a selector of breach_exposure only.
 */
export const IdentifierKind = {
  Email: "email",
  Username: "username",
  Phone: "phone",
  Ip: "ip",
} as const;
/**
 * Which submitted identifier a signal concerns. ip is a selector of breach_exposure only.
 */
export type IdentifierKind = OpenEnum<typeof IdentifierKind>;

/** @internal */
export const IdentifierKind$inboundSchema: z.ZodMiniType<
  IdentifierKind,
  unknown
> = openEnums.inboundSchema(IdentifierKind);
/** @internal */
export const IdentifierKind$outboundSchema: z.ZodMiniType<
  string,
  IdentifierKind
> = openEnums.outboundSchema(IdentifierKind);
