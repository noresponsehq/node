import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  FootprintFamily,
  FootprintFamily$inboundSchema,
  FootprintFamily$outboundSchema,
} from "./footprint-family.js";
import {
  Identifier,
  Identifier$inboundSchema,
  Identifier$outboundSchema,
} from "./identifier.js";
import {
  RiskDetailsEventKind,
  RiskDetailsEventKind$inboundSchema,
  RiskDetailsEventKind$outboundSchema,
} from "./risk-details-event-kind.js";

export type RiskDetailsEvent = {
  year: number;
  month?: number | undefined;
  kind: RiskDetailsEventKind;
  site: string;
  category: string;
  /**
   * The source-neutral kind of evidence: account_presence (an account found on a site), auth_provider (the account at your auth provider), breach (breach and credential tables), breach_abuse (abuse and fraud communities' tables) and code_hosting (a code hosting profile).
   */
  family: FootprintFamily;
  identifier: Identifier;
};

/** @internal */
export const RiskDetailsEvent$inboundSchema: z.ZodMiniType<
  RiskDetailsEvent,
  unknown
> = z.object({
  year: types.number(),
  month: types.optional(types.number()),
  kind: RiskDetailsEventKind$inboundSchema,
  site: types.string(),
  category: types.string(),
  family: FootprintFamily$inboundSchema,
  identifier: Identifier$inboundSchema,
});
/** @internal */
export type RiskDetailsEvent$Outbound = {
  year: number;
  month?: number | undefined;
  kind: string;
  site: string;
  category: string;
  family: string;
  identifier: string;
};

/** @internal */
export const RiskDetailsEvent$outboundSchema: z.ZodMiniType<
  RiskDetailsEvent$Outbound,
  RiskDetailsEvent
> = z.object({
  year: z.int(),
  month: z.optional(z.int()),
  kind: RiskDetailsEventKind$outboundSchema,
  site: z.string(),
  category: z.string(),
  family: FootprintFamily$outboundSchema,
  identifier: Identifier$outboundSchema,
});

export function riskDetailsEventToJSON(
  riskDetailsEvent: RiskDetailsEvent,
): string {
  return JSON.stringify(
    RiskDetailsEvent$outboundSchema.parse(riskDetailsEvent),
  );
}
export function riskDetailsEventFromJSON(
  jsonString: string,
): SafeParseResult<RiskDetailsEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RiskDetailsEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RiskDetailsEvent' from JSON`,
  );
}
