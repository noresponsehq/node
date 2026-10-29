import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const IdentifierSearchKind = {
  Email: "email",
  Phone: "phone",
  Username: "username",
} as const;
export type IdentifierSearchKind = OpenEnum<typeof IdentifierSearchKind>;

/** @internal */
export const IdentifierSearchKind$inboundSchema: z.ZodMiniType<
  IdentifierSearchKind,
  unknown
> = openEnums.inboundSchema(IdentifierSearchKind);
/** @internal */
export const IdentifierSearchKind$outboundSchema: z.ZodMiniType<
  string,
  IdentifierSearchKind
> = openEnums.outboundSchema(IdentifierSearchKind);
