import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Identifier = {
  Email: "email",
  Username: "username",
} as const;
export type Identifier = OpenEnum<typeof Identifier>;

/** @internal */
export const Identifier$inboundSchema: z.ZodMiniType<Identifier, unknown> =
  openEnums.inboundSchema(Identifier);
/** @internal */
export const Identifier$outboundSchema: z.ZodMiniType<string, Identifier> =
  openEnums.outboundSchema(Identifier);
