import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  LineType,
  LineType$inboundSchema,
  LineType$outboundSchema,
} from "./line-type.js";

export type RiskSummaryPhone = {
  lineType?: LineType | undefined;
  country?: string | undefined;
  /**
   * Highest report count any source gave for the number.
   */
  reportCount?: number | undefined;
  /**
   * Carrier-network metadata from privately weighted sources; not upstream provider attribution.
   */
  carrier?: string | undefined;
};

/** @internal */
export const RiskSummaryPhone$inboundSchema: z.ZodMiniType<
  RiskSummaryPhone,
  unknown
> = z.pipe(
  z.object({
    line_type: types.optional(LineType$inboundSchema),
    country: types.optional(types.string()),
    report_count: types.optional(types.number()),
    carrier: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "line_type": "lineType",
      "report_count": "reportCount",
    });
  }),
);
/** @internal */
export type RiskSummaryPhone$Outbound = {
  line_type?: string | undefined;
  country?: string | undefined;
  report_count?: number | undefined;
  carrier?: string | undefined;
};

/** @internal */
export const RiskSummaryPhone$outboundSchema: z.ZodMiniType<
  RiskSummaryPhone$Outbound,
  RiskSummaryPhone
> = z.pipe(
  z.object({
    lineType: z.optional(LineType$outboundSchema),
    country: z.optional(z.string()),
    reportCount: z.optional(z.int()),
    carrier: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      lineType: "line_type",
      reportCount: "report_count",
    });
  }),
);

export function riskSummaryPhoneToJSON(
  riskSummaryPhone: RiskSummaryPhone,
): string {
  return JSON.stringify(
    RiskSummaryPhone$outboundSchema.parse(riskSummaryPhone),
  );
}
export function riskSummaryPhoneFromJSON(
  jsonString: string,
): SafeParseResult<RiskSummaryPhone, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskSummaryPhone$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskSummaryPhone' from JSON`,
  );
}
