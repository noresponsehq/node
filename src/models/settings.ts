import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Enrichment, Enrichment$inboundSchema } from "./enrichment.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  KeyEnvironment,
  KeyEnvironment$inboundSchema,
} from "./key-environment.js";
import {
  SettingsFlows,
  SettingsFlows$inboundSchema,
} from "./settings-flows.js";

/**
 * One environment's settings: how long its assessments are kept, and for each flow the risk thresholds that decide it and the depth a request that names none is served at, the sources it refuses, the daily cap on screening spend, and how enrichment searches what an investigation finds. Live and test each have their own. A flow without thresholds of its own uses account_creation's (inherits_account_creation). Every change is recorded in the audit log as settings.updated, with who made it.
 */
export type Settings = {
  /**
   * The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.
   */
  workspaceId: string;
  /**
   * The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.
   */
  environment: KeyEnvironment;
  /**
   * Days an assessment is kept after it is created, 1 to 365 (default 365). Shortening hides older assessments at once.
   */
  retentionDays: number;
  /**
   * The monotonic settings configuration epoch, including retention changes. Zero while defaults apply. Historical assessments keep their frozen policy version; the active version reaches new assessments within a minute.
   */
  policyVersion: number;
  /**
   * Who last changed the policy: the member's external user id for a change made through the console, the prefix (nrk_<environment>_<key id>) of the management key that made it, or NoResponse. Absent while the defaults apply.
   */
  updatedBy?: string | undefined;
  /**
   * When the policy last changed. Absent while the defaults apply.
   */
  updatedAt?: string | undefined;
  flows: SettingsFlows;
  /**
   * The sources this environment refuses, sorted; empty, the default, refuses none. An assessment leaves a refused source out: its coverage is missing (an identifier with no other source lists coverage-unavailable as unavailable) rather than not_found, and a stored result of a refused source is not reused.
   */
  refusedSources: Array<string>;
  /**
   * The most the environment's screenings may spend in one UTC day, in minor units of USD (cents), 0 to 100000000; null is no cap. Default 50000. A screening whose estimated_spend exceeds the cap less the day's recorded spend and what open screenings may still spend answers 409 screening_cap_exceeded.
   */
  screeningDailyCap: number | null;
  /**
   * How enrichment searches the values that a workspace person's own investigation (POST /v1/investigations) and a group's screening find. Defaults: mode automatic, min_likelihood 0.5, kinds username, max_spend null and deadline null. Group screening follows the same setting, but takes mode suggest while the workspace has not set a mode. An investigation request may override each field for that investigation. A change applies to the next search enrichment starts, investigations already run included. Enrichment also keeps to limits of its own: each value once per person (once more if that search failed), at most 5 searches from one search's records, 20 per person and 6 searches deep.
   */
  enrichment: Enrichment;
};

/** @internal */
export const Settings$inboundSchema: z.ZodMiniType<Settings, unknown> = z.pipe(
  z.object({
    workspace_id: types.string(),
    environment: KeyEnvironment$inboundSchema,
    retention_days: types.number(),
    policy_version: types.number(),
    updated_by: types.optional(types.string()),
    updated_at: types.optional(types.string()),
    flows: SettingsFlows$inboundSchema,
    refused_sources: z.array(types.string()),
    screening_daily_cap: types.nullable(types.number()),
    enrichment: Enrichment$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "workspace_id": "workspaceId",
      "retention_days": "retentionDays",
      "policy_version": "policyVersion",
      "updated_by": "updatedBy",
      "updated_at": "updatedAt",
      "refused_sources": "refusedSources",
      "screening_daily_cap": "screeningDailyCap",
    });
  }),
);

export function settingsFromJSON(
  jsonString: string,
): SafeParseResult<Settings, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Settings$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Settings' from JSON`,
  );
}
