import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountRiskChanged,
  AccountRiskChanged$inboundSchema,
  AccountRiskChanged$Outbound,
  AccountRiskChanged$outboundSchema,
} from "./account-risk-changed.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The account.risk_changed event.
 */
export type AccountRiskChangedEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always account.risk_changed.
   */
  type: "account.risk_changed";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * The account's decision for at least one flow changed. account is the account as GET /v1/accounts/{account_id} answers it for the revision that made the change: its new score, decision, reasons and decisions_by_flow, and the assessment the risk comes from. previous_decisions_by_flow are the decisions it replaced, so account.decisions_by_flow differs from them for at least one flow, and previous_risk_version is the risk_version they were announced at. On the account's first event no decision was announced before: previous_risk_version is absent and previous_decisions_by_flow is allow for every flow, the decisions an account has before its first event. Events of one account are not ordered: account.risk_version orders them, so keep the account with the highest risk_version and ignore an event whose account is older than the one held.
   */
  data: AccountRiskChanged;
};

/** @internal */
export const AccountRiskChangedEvent$inboundSchema: z.ZodMiniType<
  AccountRiskChangedEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("account.risk_changed"),
    test: types.optional(types.boolean()),
    data: AccountRiskChanged$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type AccountRiskChangedEvent$Outbound = {
  id: string;
  created_at: string;
  type: "account.risk_changed";
  test?: boolean | undefined;
  data: AccountRiskChanged$Outbound;
};

/** @internal */
export const AccountRiskChangedEvent$outboundSchema: z.ZodMiniType<
  AccountRiskChangedEvent$Outbound,
  AccountRiskChangedEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("account.risk_changed"),
    test: z.optional(z.boolean()),
    data: AccountRiskChanged$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function accountRiskChangedEventToJSON(
  accountRiskChangedEvent: AccountRiskChangedEvent,
): string {
  return JSON.stringify(
    AccountRiskChangedEvent$outboundSchema.parse(accountRiskChangedEvent),
  );
}
export function accountRiskChangedEventFromJSON(
  jsonString: string,
): SafeParseResult<AccountRiskChangedEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountRiskChangedEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountRiskChangedEvent' from JSON`,
  );
}
