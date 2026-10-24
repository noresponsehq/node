import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  BreachExposed,
  BreachExposed$inboundSchema,
  BreachExposed$outboundSchema,
} from "./breach-exposed.js";
import {
  BreachKind,
  BreachKind$inboundSchema,
  BreachKind$outboundSchema,
} from "./breach-kind.js";
import {
  BreachSelector,
  BreachSelector$inboundSchema,
  BreachSelector$outboundSchema,
} from "./breach-selector.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * One breach table that matched, detailed view only. name is the catalogue's display name for the table's site, not the upstream provider. No member carries a record, value, password or hash.
 */
export type Breach = {
  name: string;
  /**
   * The breached site's domain, lower case. Absent when the table has none (a credential list, for example).
   */
  domain?: string | undefined;
  /**
   * The table's category from its name, lower case (social, gaming, combolist, ...).
   */
  category?: string | undefined;
  /**
   * Who is in the table: site_breach, a site's own users; credential_list, a combolist or compilation; stealer_log, malware or botnet victims; scrape; hacking_forum, a criminal hacking, cracking or carding community; abuse_service, the customers of DDoS-for-hire, account generators, dump or card shops, darknet markets, stalkerware or breach-lookup services; darkweb_site, an onion site of unknown purpose.
   */
  kind: BreachKind;
  /**
   * A breach table's date year.
   */
  year?: number | undefined;
  /**
   * Absent when only the year is known.
   */
  month?: number | undefined;
  /**
   * The submitted identifier a breach table matched on: email or username. Phone and name are not breach selectors.
   */
  matchedOn: BreachSelector;
  exposed?: Array<BreachExposed> | undefined;
};

/** @internal */
export const Breach$inboundSchema: z.ZodMiniType<Breach, unknown> = z.pipe(
  z.object({
    name: types.string(),
    domain: types.optional(types.string()),
    category: types.optional(types.string()),
    kind: BreachKind$inboundSchema,
    year: types.optional(types.number()),
    month: types.optional(types.number()),
    matched_on: BreachSelector$inboundSchema,
    exposed: types.optional(z.array(BreachExposed$inboundSchema)),
  }),
  z.transform((v) => {
    return remap$(v, {
      "matched_on": "matchedOn",
    });
  }),
);
/** @internal */
export type Breach$Outbound = {
  name: string;
  domain?: string | undefined;
  category?: string | undefined;
  kind: string;
  year?: number | undefined;
  month?: number | undefined;
  matched_on: string;
  exposed?: Array<string> | undefined;
};

/** @internal */
export const Breach$outboundSchema: z.ZodMiniType<Breach$Outbound, Breach> = z
  .pipe(
    z.object({
      name: z.string(),
      domain: z.optional(z.string()),
      category: z.optional(z.string()),
      kind: BreachKind$outboundSchema,
      year: z.optional(z.int()),
      month: z.optional(z.int()),
      matchedOn: BreachSelector$outboundSchema,
      exposed: z.optional(z.array(BreachExposed$outboundSchema)),
    }),
    z.transform((v) => {
      return remap$(v, {
        matchedOn: "matched_on",
      });
    }),
  );

export function breachToJSON(breach: Breach): string {
  return JSON.stringify(Breach$outboundSchema.parse(breach));
}
export function breachFromJSON(
  jsonString: string,
): SafeParseResult<Breach, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Breach$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Breach' from JSON`,
  );
}
