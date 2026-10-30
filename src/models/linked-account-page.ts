import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  LinkedAccount,
  LinkedAccount$inboundSchema,
} from "./linked-account.js";

/**
 * Other accounts in this workspace and environment whose retained assessments submitted an email, phone or customer-namespace username that one of account_id's retained assessments also submitted. Matching uses the identifier search rules: exact, canonical and, for email, mailbox. Only customer-submitted identifiers link accounts; source-discovered identifiers do not. Expired, retention-shortened, deleted and erased assessments link nothing. A shared identifier is not verified ownership. Accounts use stable opaque order, the page and total share one database snapshot, and later pages are live. Cursors bind the workspace, environment, operation and account_id, and expire.
 */
export type LinkedAccountPage = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  /**
   * The account whose submitted identifiers were compared. It is excluded from items.
   */
  accountId: string;
  items: Array<LinkedAccount>;
  /**
   * Distinct linked accounts, exact below 10000 and capped at 10000.
   */
  total: number;
  /**
   * True when at least 10000 accounts are linked.
   */
  totalCapped: boolean;
  /**
   * Opaque, expiring cursor bound to this environment, operation and account_id. Absent on the last page.
   */
  nextCursor?: string | undefined;
};

/** @internal */
export const LinkedAccountPage$inboundSchema: z.ZodMiniType<
  LinkedAccountPage,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    account_id: types.string(),
    items: z.array(LinkedAccount$inboundSchema),
    total: types.number(),
    total_capped: types.boolean(),
    next_cursor: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "account_id": "accountId",
      "total_capped": "totalCapped",
      "next_cursor": "nextCursor",
    });
  }),
);

export function linkedAccountPageFromJSON(
  jsonString: string,
): SafeParseResult<LinkedAccountPage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => LinkedAccountPage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'LinkedAccountPage' from JSON`,
  );
}
