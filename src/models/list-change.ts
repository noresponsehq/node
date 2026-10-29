import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ListChangeState,
  ListChangeState$inboundSchema,
} from "./list-change-state.js";
import { ListEntry, ListEntry$inboundSchema } from "./list-entry.js";

/**
 * A committed bulk list change and bounded notification progress, available while propagation is pending and for 24 hours after all propagation completes. References count an account once per changed list entry and are not unique accounts. No endpoint delivery or customer enforcement is implied by completed.
 */
export type ListChange = {
  id: string;
  createdAt: string;
  state: ListChangeState;
  added: Array<ListEntry>;
  removed: Array<string>;
  pendingPropagations: number;
  processedAccountReferences: number;
};

/** @internal */
export const ListChange$inboundSchema: z.ZodMiniType<ListChange, unknown> = z
  .pipe(
    z.object({
      id: types.string(),
      created_at: types.string(),
      state: ListChangeState$inboundSchema,
      added: z.array(ListEntry$inboundSchema),
      removed: z.array(types.string()),
      pending_propagations: types.number(),
      processed_account_references: types.number(),
    }),
    z.transform((v) => {
      return remap$(v, {
        "created_at": "createdAt",
        "pending_propagations": "pendingPropagations",
        "processed_account_references": "processedAccountReferences",
      });
    }),
  );

export function listChangeFromJSON(
  jsonString: string,
): SafeParseResult<ListChange, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListChange$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListChange' from JSON`,
  );
}
