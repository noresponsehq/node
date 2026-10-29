import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  Priority,
  Priority$inboundSchema,
  Priority$outboundSchema,
} from "./priority.js";
import {
  ReviewStatus,
  ReviewStatus$inboundSchema,
  ReviewStatus$outboundSchema,
} from "./review-status.js";

export type Filter = {
  /**
   * Only reviews of this exact account in the authenticated workspace and environment. Applied before pagination.
   */
  accountId?: string | undefined;
  status?: ReviewStatus | undefined;
  priority?: Priority | undefined;
  assignee?: string | undefined;
  unassigned?: boolean | undefined;
  assigneePrincipalId?: string | undefined;
};

/** @internal */
export const Filter$inboundSchema: z.ZodMiniType<Filter, unknown> = z.pipe(
  z.object({
    account_id: types.optional(types.string()),
    status: types.optional(ReviewStatus$inboundSchema),
    priority: types.optional(Priority$inboundSchema),
    assignee: types.optional(types.string()),
    unassigned: types.optional(types.boolean()),
    assignee_principal_id: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "account_id": "accountId",
      "assignee_principal_id": "assigneePrincipalId",
    });
  }),
);
/** @internal */
export type Filter$Outbound = {
  account_id?: string | undefined;
  status?: string | undefined;
  priority?: string | undefined;
  assignee?: string | undefined;
  unassigned?: boolean | undefined;
  assignee_principal_id?: string | undefined;
};

/** @internal */
export const Filter$outboundSchema: z.ZodMiniType<Filter$Outbound, Filter> = z
  .pipe(
    z.object({
      accountId: z.optional(z.string()),
      status: z.optional(ReviewStatus$outboundSchema),
      priority: z.optional(Priority$outboundSchema),
      assignee: z.optional(z.string()),
      unassigned: z.optional(z.boolean()),
      assigneePrincipalId: z.optional(z.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        accountId: "account_id",
        assigneePrincipalId: "assignee_principal_id",
      });
    }),
  );

export function filterToJSON(filter: Filter): string {
  return JSON.stringify(Filter$outboundSchema.parse(filter));
}
export function filterFromJSON(
  jsonString: string,
): SafeParseResult<Filter, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Filter$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Filter' from JSON`,
  );
}
