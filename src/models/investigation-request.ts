import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  EnrichmentChange,
  EnrichmentChange$Outbound,
  EnrichmentChange$outboundSchema,
} from "./enrichment-change.js";
import {
  ScreeningDepth,
  ScreeningDepth$outboundSchema,
} from "./screening-depth.js";

/**
 * Runs a new investigation against one retained workspace person.
 */
export type InvestigationRequest = {
  depth: ScreeningDepth;
  /**
   * Deprecated: leave it out. Without it the investigation is a full search: every platform a connector serves in the environment when the investigation starts, which the investigation then lists, each searched only with the identifiers its connector takes. A list sent here still limits the investigation until a later contract release removes the field.
   *
   * @deprecated field: This will be removed in a future release, please migrate away from it as soon as possible.
   */
  platforms?: Array<string> | undefined;
  personId: string;
  /**
   * A change to enrichment. A field left out keeps the value in force; max_spend or deadline null removes the bound.
   */
  enrichment?: EnrichmentChange | undefined;
};

/** @internal */
export type InvestigationRequest$Outbound = {
  depth: string;
  platforms?: Array<string> | undefined;
  person_id: string;
  enrichment?: EnrichmentChange$Outbound | undefined;
};

/** @internal */
export const InvestigationRequest$outboundSchema: z.ZodMiniType<
  InvestigationRequest$Outbound,
  InvestigationRequest
> = z.pipe(
  z.object({
    depth: ScreeningDepth$outboundSchema,
    platforms: z.optional(z.array(z.string())),
    personId: z.string(),
    enrichment: z.optional(EnrichmentChange$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      personId: "person_id",
    });
  }),
);

export function investigationRequestToJSON(
  investigationRequest: InvestigationRequest,
): string {
  return JSON.stringify(
    InvestigationRequest$outboundSchema.parse(investigationRequest),
  );
}
