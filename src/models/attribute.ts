import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * name_gender is the records' gender against the submitted first name's usual one.
 */
export const Attribute = {
  BirthDate: "birth_date",
  Gender: "gender",
  Nationality: "nationality",
  NameGender: "name_gender",
} as const;
/**
 * name_gender is the records' gender against the submitted first name's usual one.
 */
export type Attribute = OpenEnum<typeof Attribute>;

/** @internal */
export const Attribute$inboundSchema: z.ZodMiniType<Attribute, unknown> =
  openEnums.inboundSchema(Attribute);
/** @internal */
export const Attribute$outboundSchema: z.ZodMiniType<string, Attribute> =
  openEnums.outboundSchema(Attribute);
