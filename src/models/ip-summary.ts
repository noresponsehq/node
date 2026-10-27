import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  IpSummaryType,
  IpSummaryType$inboundSchema,
  IpSummaryType$outboundSchema,
} from "./ip-summary-type.js";

/**
 * Facts about the submitted IP from the offline database and this workspace's own recent assessments. Every member is optional; absent makes no claim.
 */
export type IpSummary = {
  /**
   * ISO 3166-1 alpha-2 country of the address.
   */
  country?: string | undefined;
  /**
   * The address's network type.
   */
  type?: IpSummaryType | undefined;
  /**
   * Autonomous system number of the network that announces the address, from the offline database. Absent when unknown.
   */
  asn?: number | undefined;
  /**
   * Assessments in this workspace with the same IP in the last 24 hours, this one included. A count only.
   */
  seenInWorkspace?: number | undefined;
};

/** @internal */
export const IpSummary$inboundSchema: z.ZodMiniType<IpSummary, unknown> = z
  .pipe(
    z.object({
      country: types.optional(types.string()),
      type: types.optional(IpSummaryType$inboundSchema),
      asn: types.optional(types.number()),
      seen_in_workspace: types.optional(types.number()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "seen_in_workspace": "seenInWorkspace",
      });
    }),
  );
/** @internal */
export type IpSummary$Outbound = {
  country?: string | undefined;
  type?: string | undefined;
  asn?: number | undefined;
  seen_in_workspace?: number | undefined;
};

/** @internal */
export const IpSummary$outboundSchema: z.ZodMiniType<
  IpSummary$Outbound,
  IpSummary
> = z.pipe(
  z.object({
    country: z.optional(z.string()),
    type: z.optional(IpSummaryType$outboundSchema),
    asn: z.optional(z.int()),
    seenInWorkspace: z.optional(z.int()),
  }),
  z.transform((v) => {
    return remap$(v, {
      seenInWorkspace: "seen_in_workspace",
    });
  }),
);

export function ipSummaryToJSON(ipSummary: IpSummary): string {
  return JSON.stringify(IpSummary$outboundSchema.parse(ipSummary));
}
export function ipSummaryFromJSON(
  jsonString: string,
): SafeParseResult<IpSummary, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => IpSummary$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'IpSummary' from JSON`,
  );
}
