import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PhoneEnrichmentFields,
  PhoneEnrichmentFields$inboundSchema,
  PhoneEnrichmentFields$Outbound,
  PhoneEnrichmentFields$outboundSchema,
} from "./phone-enrichment-fields.js";

/**
 * Facts about the number only: line type, carrier and country. The upstream provider, its scores and its verdicts stay internal.
 */
export type PhoneEnrichment = {
  fields: PhoneEnrichmentFields;
};

/** @internal */
export const PhoneEnrichment$inboundSchema: z.ZodMiniType<
  PhoneEnrichment,
  unknown
> = z.object({
  fields: PhoneEnrichmentFields$inboundSchema,
});
/** @internal */
export type PhoneEnrichment$Outbound = {
  fields: PhoneEnrichmentFields$Outbound;
};

/** @internal */
export const PhoneEnrichment$outboundSchema: z.ZodMiniType<
  PhoneEnrichment$Outbound,
  PhoneEnrichment
> = z.object({
  fields: PhoneEnrichmentFields$outboundSchema,
});

export function phoneEnrichmentToJSON(
  phoneEnrichment: PhoneEnrichment,
): string {
  return JSON.stringify(PhoneEnrichment$outboundSchema.parse(phoneEnrichment));
}
export function phoneEnrichmentFromJSON(
  jsonString: string,
): SafeParseResult<PhoneEnrichment, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PhoneEnrichment$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PhoneEnrichment' from JSON`,
  );
}
