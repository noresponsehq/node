import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  ConsoleLookups,
  ConsoleLookups$inboundSchema,
} from "./console-lookups.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { UsageCount, UsageCount$inboundSchema } from "./usage-count.js";

/**
 * Body of the 200 answer to GET /v1/workspaces/{workspace_id}/usage: what the workspace's environments were metered for on each UTC day from from through to. Each billable unit is counted once, where it becomes final: an assessment when it is admitted (by flow and depth), a webhook delivery once per event per endpoint (retries and replays add nothing), and a key-usage event once when the ingest accepts it. A count does not change when the assessment, account or workspace is later deleted. A day, environment or metric with nothing counted has no item. No prices or billing. console_lookups is the one limit: the live environment's daily cap on console lookups, as spent today.
 */
export type Usage = {
  /**
   * The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.
   */
  workspaceId: string;
  /**
   * The first UTC day covered.
   */
  from: string;
  /**
   * The last UTC day covered, included.
   */
  to: string;
  /**
   * Ordered by environment (live first), then day, metric, flow and depth.
   */
  items: Array<UsageCount>;
  /**
   * The live environment's daily cap on assessments members make through the console (the playground), as spent on the current UTC day. Each console submission with a new Idempotency-Key spends one lookup; a replay spends nothing, and API keys and the test environment spend none. When used reaches limit, the next lookup answers 429 lookup_limit_reached until resets_at. The count is the one the cap enforces.
   */
  consoleLookups?: ConsoleLookups | undefined;
};

/** @internal */
export const Usage$inboundSchema: z.ZodMiniType<Usage, unknown> = z.pipe(
  z.object({
    workspace_id: types.string(),
    from: types.string(),
    to: types.string(),
    items: z.array(UsageCount$inboundSchema),
    console_lookups: types.optional(ConsoleLookups$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "workspace_id": "workspaceId",
      "console_lookups": "consoleLookups",
    });
  }),
);

export function usageFromJSON(
  jsonString: string,
): SafeParseResult<Usage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Usage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Usage' from JSON`,
  );
}
