import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Identifier = {
  Email: "email",
  Phone: "phone",
  Username: "username",
  Name: "name",
} as const;
export type Identifier = OpenEnum<typeof Identifier>;

/** @internal */
export const Identifier$inboundSchema: z.ZodMiniType<Identifier, unknown> =
  openEnums.inboundSchema(Identifier);
