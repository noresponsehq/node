import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Account, Account$inboundSchema } from "./account.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Body of the 200 answer to GET /v1/accounts: the calling workspace's accounts whose risk changed after changed_since, in the environment of the calling key, oldest change first. An account is listed when its risk_version advanced and it has a current risk, and each item is the account exactly as GET /v1/accounts/{account_id} answers it. An account appears once per page, at its latest change; when its risk changes again later, it appears again on a later page with the newer risk_version. next_cursor is always present: pass it back as changed_since to read the changes made after this page.
 */
export type AccountList = {
  items: Array<Account>;
  /**
   * Opaque cursor after the last change this page read, bound to the workspace and the environment of the calling key. Pass it back unchanged as changed_since. It is present on every page, the last one included: when nothing changed after changed_since it is the cursor that was sent, so a poller keeps calling with the latest next_cursor. A tampered or foreign cursor answers 400 invalid_cursor. Consumers do not parse it.
   */
  nextCursor: string;
};

/** @internal */
export const AccountList$inboundSchema: z.ZodMiniType<AccountList, unknown> = z
  .pipe(
    z.object({
      items: z.array(Account$inboundSchema),
      next_cursor: types.string(),
    }),
    z.transform((v) => {
      return remap$(v, {
        "next_cursor": "nextCursor",
      });
    }),
  );

export function accountListFromJSON(
  jsonString: string,
): SafeParseResult<AccountList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountList' from JSON`,
  );
}
