import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  ConsistencyValue,
  ConsistencyValue$inboundSchema,
  ConsistencyValue$outboundSchema,
} from "./consistency-value.js";
import {
  Country,
  Country$inboundSchema,
  Country$outboundSchema,
} from "./country.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Cross-identifier agreement, computed from facts only. Every member is optional; absent makes no claim.
 */
export type Consistency = {
  /**
   * How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.
   */
  name?: ConsistencyValue | undefined;
  /**
   * How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.
   */
  phone?: ConsistencyValue | undefined;
  /**
   * How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.
   */
  ip?: ConsistencyValue | undefined;
  /**
   * IP country, phone country, breach countries and policy_context.region together. When the breach records give a country, the timezone and locale countries count too. The IP country of a proxy or hosting network does not count.
   */
  country?: Country | undefined;
};

/** @internal */
export const Consistency$inboundSchema: z.ZodMiniType<Consistency, unknown> = z
  .object({
    name: types.optional(ConsistencyValue$inboundSchema),
    phone: types.optional(ConsistencyValue$inboundSchema),
    ip: types.optional(ConsistencyValue$inboundSchema),
    country: types.optional(Country$inboundSchema),
  });
/** @internal */
export type Consistency$Outbound = {
  name?: string | undefined;
  phone?: string | undefined;
  ip?: string | undefined;
  country?: string | undefined;
};

/** @internal */
export const Consistency$outboundSchema: z.ZodMiniType<
  Consistency$Outbound,
  Consistency
> = z.object({
  name: z.optional(ConsistencyValue$outboundSchema),
  phone: z.optional(ConsistencyValue$outboundSchema),
  ip: z.optional(ConsistencyValue$outboundSchema),
  country: z.optional(Country$outboundSchema),
});

export function consistencyToJSON(consistency: Consistency): string {
  return JSON.stringify(Consistency$outboundSchema.parse(consistency));
}
export function consistencyFromJSON(
  jsonString: string,
): SafeParseResult<Consistency, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Consistency$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Consistency' from JSON`,
  );
}
