import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  ConsistencyValue,
  ConsistencyValue$inboundSchema,
} from "./consistency-value.js";
import { Country, Country$inboundSchema } from "./country.js";
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
   * IP country, phone country, breach countries and policy_context.region together.
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

export function consistencyFromJSON(
  jsonString: string,
): SafeParseResult<Consistency, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Consistency$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Consistency' from JSON`,
  );
}
