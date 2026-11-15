import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  ScreeningDepth,
  ScreeningDepth$outboundSchema,
} from "./screening-depth.js";

/**
 * Runs a new investigation against one retained workspace person.
 */
export type InvestigationRequest = {
  depth: ScreeningDepth;
  platforms: Array<string>;
  personId: string;
};

/** @internal */
export type InvestigationRequest$Outbound = {
  depth: string;
  platforms: Array<string>;
  person_id: string;
};

/** @internal */
export const InvestigationRequest$outboundSchema: z.ZodMiniType<
  InvestigationRequest$Outbound,
  InvestigationRequest
> = z.pipe(
  z.object({
    depth: ScreeningDepth$outboundSchema,
    platforms: z.array(z.string()),
    personId: z.string(),
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
