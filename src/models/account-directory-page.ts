import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountDirectoryPageItem,
  AccountDirectoryPageItem$inboundSchema,
} from "./account-directory-page-item.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Accounts observed in retained assessments, newest seen first, with each account once per page and across pages. Counts and keyset pagination are computed over distinct accounts in one database snapshot per page. Live data can change between pages.
 */
export type AccountDirectoryPage = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  items: Array<AccountDirectoryPageItem>;
  /**
   * Distinct accounts matching the filters, exact below 10000 and capped at 10000.
   */
  total: number;
  /**
   * True when at least 10000 accounts match.
   */
  totalCapped: boolean;
  /**
   * Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged.
   */
  nextCursor?: string | undefined;
};

/** @internal */
export const AccountDirectoryPage$inboundSchema: z.ZodMiniType<
  AccountDirectoryPage,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    items: z.array(AccountDirectoryPageItem$inboundSchema),
    total: types.number(),
    total_capped: types.boolean(),
    next_cursor: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "total_capped": "totalCapped",
      "next_cursor": "nextCursor",
    });
  }),
);

export function accountDirectoryPageFromJSON(
  jsonString: string,
): SafeParseResult<AccountDirectoryPage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountDirectoryPage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountDirectoryPage' from JSON`,
  );
}
