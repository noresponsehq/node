import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountDeleted,
  AccountDeleted$inboundSchema,
  AccountDeleted$Outbound,
  AccountDeleted$outboundSchema,
} from "./account-deleted.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The account.deleted event.
 */
export type AccountDeletedEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always account.deleted.
   */
  type: "account.deleted";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * Terminal for the account's assessments created at or before deleted_at in the receiving endpoint's environment: delete what you hold from them and ignore later-arriving updates of them. deleted_at is no earlier than the creation of any assessment it erased. An assessment created after it belongs to the account assessed again: keep it, even when this event arrives after it.
   */
  data: AccountDeleted;
};

/** @internal */
export const AccountDeletedEvent$inboundSchema: z.ZodMiniType<
  AccountDeletedEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("account.deleted"),
    test: types.optional(types.boolean()),
    data: AccountDeleted$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type AccountDeletedEvent$Outbound = {
  id: string;
  created_at: string;
  type: "account.deleted";
  test?: boolean | undefined;
  data: AccountDeleted$Outbound;
};

/** @internal */
export const AccountDeletedEvent$outboundSchema: z.ZodMiniType<
  AccountDeletedEvent$Outbound,
  AccountDeletedEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("account.deleted"),
    test: z.optional(z.boolean()),
    data: AccountDeleted$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function accountDeletedEventToJSON(
  accountDeletedEvent: AccountDeletedEvent,
): string {
  return JSON.stringify(
    AccountDeletedEvent$outboundSchema.parse(accountDeletedEvent),
  );
}
export function accountDeletedEventFromJSON(
  jsonString: string,
): SafeParseResult<AccountDeletedEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountDeletedEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountDeletedEvent' from JSON`,
  );
}
