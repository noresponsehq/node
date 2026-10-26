import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  Agreement,
  Agreement$inboundSchema,
  Agreement$outboundSchema,
} from "./agreement.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.
 */
export type AttributeAgreement = {
  agreement: Agreement;
  values: number;
  support: number;
};

/** @internal */
export const AttributeAgreement$inboundSchema: z.ZodMiniType<
  AttributeAgreement,
  unknown
> = z.object({
  agreement: Agreement$inboundSchema,
  values: types.number(),
  support: types.number(),
});
/** @internal */
export type AttributeAgreement$Outbound = {
  agreement: string;
  values: number;
  support: number;
};

/** @internal */
export const AttributeAgreement$outboundSchema: z.ZodMiniType<
  AttributeAgreement$Outbound,
  AttributeAgreement
> = z.object({
  agreement: Agreement$outboundSchema,
  values: z.int(),
  support: z.int(),
});

export function attributeAgreementToJSON(
  attributeAgreement: AttributeAgreement,
): string {
  return JSON.stringify(
    AttributeAgreement$outboundSchema.parse(attributeAgreement),
  );
}
export function attributeAgreementFromJSON(
  jsonString: string,
): SafeParseResult<AttributeAgreement, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AttributeAgreement$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AttributeAgreement' from JSON`,
  );
}
