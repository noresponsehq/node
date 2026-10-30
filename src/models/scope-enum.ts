import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * assessment requires one submission to satisfy the complete expression. account permits witnesses across retained submissions of one account and is supported only by POST /v1/accounts/search. No default: select scope explicitly.
 */
export const ScopeEnum = {
  Assessment: "assessment",
  Account: "account",
} as const;
/**
 * assessment requires one submission to satisfy the complete expression. account permits witnesses across retained submissions of one account and is supported only by POST /v1/accounts/search. No default: select scope explicitly.
 */
export type ScopeEnum = ClosedEnum<typeof ScopeEnum>;

/** @internal */
export const ScopeEnum$outboundSchema: z.ZodMiniEnum<typeof ScopeEnum> = z.enum(
  ScopeEnum,
);
