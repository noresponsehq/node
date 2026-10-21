import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this tenant for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.
 */
export const Outcome = {
  ConfirmedAbuse: "confirmed_abuse",
  AccountTakeover: "account_takeover",
  Chargeback: "chargeback",
  FalsePositive: "false_positive",
  Legitimate: "legitimate",
  Unknown: "unknown",
} as const;
/**
 * What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this tenant for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.
 */
export type Outcome = OpenEnum<typeof Outcome>;

/** @internal */
export const Outcome$inboundSchema: z.ZodMiniType<Outcome, unknown> = openEnums
  .inboundSchema(Outcome);
/** @internal */
export const Outcome$outboundSchema: z.ZodMiniType<string, Outcome> = openEnums
  .outboundSchema(Outcome);
