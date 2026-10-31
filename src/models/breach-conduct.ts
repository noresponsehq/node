import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * What a breach table's rows record against the identifier: chargeback, one or more chargebacks; declined_payment, one or more declined payments; forum_sanction, a forum ban, warning or infraction. A category and not a value: the schema has no member for one.
 */
export const BreachConduct = {
  Chargeback: "chargeback",
  DeclinedPayment: "declined_payment",
  ForumSanction: "forum_sanction",
} as const;
/**
 * What a breach table's rows record against the identifier: chargeback, one or more chargebacks; declined_payment, one or more declined payments; forum_sanction, a forum ban, warning or infraction. A category and not a value: the schema has no member for one.
 */
export type BreachConduct = OpenEnum<typeof BreachConduct>;

/** @internal */
export const BreachConduct$inboundSchema: z.ZodMiniType<
  BreachConduct,
  unknown
> = openEnums.inboundSchema(BreachConduct);
/** @internal */
export const BreachConduct$outboundSchema: z.ZodMiniType<
  string,
  BreachConduct
> = openEnums.outboundSchema(BreachConduct);
