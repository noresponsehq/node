import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Action, Action$inboundSchema } from "./action.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ListImpactKind,
  ListImpactKind$inboundSchema,
} from "./list-impact-kind.js";
import {
  ListImpactTransition,
  ListImpactTransition$inboundSchema,
} from "./list-impact-transition.js";

/**
 * List override changes among the newest 5000 matching accounts. These counts describe override inputs. Customer enforcement and eventual outcomes remain separate. The response reports whether the matching population was truncated.
 */
export type ListImpact = {
  scope: "current_list_override_inputs";
  kind: ListImpactKind;
  value: string;
  action: Action;
  remove?: string | undefined;
  matchedAccounts: number;
  changedOverrides: number;
  truncated: boolean;
  historicalPopulationKnown: false;
  transitions: Array<ListImpactTransition>;
};

/** @internal */
export const ListImpact$inboundSchema: z.ZodMiniType<ListImpact, unknown> = z
  .pipe(
    z.object({
      scope: types.literal("current_list_override_inputs"),
      kind: ListImpactKind$inboundSchema,
      value: types.string(),
      action: Action$inboundSchema,
      remove: types.optional(types.string()),
      matched_accounts: types.number(),
      changed_overrides: types.number(),
      truncated: types.boolean(),
      historical_population_known: types.literal(false),
      transitions: z.array(ListImpactTransition$inboundSchema),
    }),
    z.transform((v) => {
      return remap$(v, {
        "matched_accounts": "matchedAccounts",
        "changed_overrides": "changedOverrides",
        "historical_population_known": "historicalPopulationKnown",
      });
    }),
  );

export function listImpactFromJSON(
  jsonString: string,
): SafeParseResult<ListImpact, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListImpact$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListImpact' from JSON`,
  );
}
