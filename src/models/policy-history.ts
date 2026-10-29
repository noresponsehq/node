import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PolicyHistoryItem,
  PolicyHistoryItem$inboundSchema,
} from "./policy-history-item.js";

/**
 * Immutable settings snapshots, newest first. history_complete is false when earlier versions predate capture. A restored version is published with a fresh version number. History is removed with the tenant.
 */
export type PolicyHistory = {
  items: Array<PolicyHistoryItem>;
  hasMore: boolean;
  nextBeforeVersion?: number | undefined;
  historyComplete: boolean;
};

/** @internal */
export const PolicyHistory$inboundSchema: z.ZodMiniType<
  PolicyHistory,
  unknown
> = z.pipe(
  z.object({
    items: z.array(PolicyHistoryItem$inboundSchema),
    has_more: types.boolean(),
    next_before_version: types.optional(types.number()),
    history_complete: types.boolean(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "has_more": "hasMore",
      "next_before_version": "nextBeforeVersion",
      "history_complete": "historyComplete",
    });
  }),
);

export function policyHistoryFromJSON(
  jsonString: string,
): SafeParseResult<PolicyHistory, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PolicyHistory$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PolicyHistory' from JSON`,
  );
}
