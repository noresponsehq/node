import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  KeyEnvironment,
  KeyEnvironment$inboundSchema,
} from "./key-environment.js";
import {
  ListEntryAction,
  ListEntryAction$inboundSchema,
} from "./list-entry-action.js";
import {
  ListEntryKind,
  ListEntryKind$inboundSchema,
} from "./list-entry-kind.js";

/**
 * One entry of an environment's list: an exact email or an email domain that decides an account whatever its score. An account matches when one of its admitted assessments sent the email, or an email of the domain. A block entry decides block for every flow and an allow entry decides allow; when both match, block wins. The account's risk carries the list_match reason with the entry's id, and its score stays the one the assessment's facts give. A held flow still waits for its investigation.
 */
export type ListEntry = {
  /**
   * The entry's id: lst_ and a ULID.
   */
  id: string;
  /**
   * The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.
   */
  workspaceId: string;
  /**
   * The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.
   */
  environment: KeyEnvironment;
  /**
   * email matches one address, whatever the case of its local part. email_domain matches every address of the registrable domain and of its subdomains.
   */
  kind: ListEntryKind;
  /**
   * The value the entry matches, in canonical form: an email lower-cased whole, or a domain lower-cased and taken to its registrable domain (mail.example.co.uk is stored as example.co.uk).
   */
  value: string;
  /**
   * block decides block for the accounts the entry matches; allow decides allow. Block wins when both match.
   */
  action: ListEntryAction;
  /**
   * Why the entry exists, for the people who manage the list. It is shown with the entry and decides nothing.
   */
  note?: string | undefined;
  createdAt: string;
  /**
   * The external user id of the member who added the entry through the console, or the prefix (nrk_<environment>_<key id>) of the management key that added it.
   */
  createdBy: string;
};

/** @internal */
export const ListEntry$inboundSchema: z.ZodMiniType<ListEntry, unknown> = z
  .pipe(
    z.object({
      id: types.string(),
      workspace_id: types.string(),
      environment: KeyEnvironment$inboundSchema,
      kind: ListEntryKind$inboundSchema,
      value: types.string(),
      action: ListEntryAction$inboundSchema,
      note: types.optional(types.string()),
      created_at: types.string(),
      created_by: types.string(),
    }),
    z.transform((v) => {
      return remap$(v, {
        "workspace_id": "workspaceId",
        "created_at": "createdAt",
        "created_by": "createdBy",
      });
    }),
  );

export function listEntryFromJSON(
  jsonString: string,
): SafeParseResult<ListEntry, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListEntry$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListEntry' from JSON`,
  );
}
