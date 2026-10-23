import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * A stable reason code. New codes may appear; ignore any you do not know.
 */
export const ReasonCode = {
  NoDigitalFootprint: "no_digital_footprint",
  VoipNumber: "voip_number",
  DisposableEmail: "disposable_email",
  NewEmail: "new_email",
  SpamReports: "spam_reports",
  FraudFlag: "fraud_flag",
  IdentityMismatch: "identity_mismatch",
  CountryMismatch: "country_mismatch",
  ProxyIp: "proxy_ip",
  SeenBefore: "seen_before",
  SharedIp: "shared_ip",
  ManyRecentSignups: "many_recent_signups",
  EstablishedAccounts: "established_accounts",
  AgedIdentity: "aged_identity",
  BreachNameMatch: "breach_name_match",
  BreachCooccurrence: "breach_cooccurrence",
  BreachNameMismatch: "breach_name_mismatch",
  BreachPhoneMismatch: "breach_phone_mismatch",
  RecentPasswordExposure: "recent_password_exposure",
  CredentialListExposure: "credential_list_exposure",
  AbuseEcosystemMember: "abuse_ecosystem_member",
  NoBreachHistory: "no_breach_history",
  AutomationFastSubmit: "automation_fast_submit",
  ClientClockSkew: "client_clock_skew",
  BotOrAutomation: "bot_or_automation",
  AuthEmailVerified: "auth_email_verified",
  AuthPhoneVerified: "auth_phone_verified",
  AuthMfaRecent: "auth_mfa_recent",
  AuthNewSession: "auth_new_session",
  AuthNewAccount: "auth_new_account",
  AuthImpersonated: "auth_impersonated",
  ContextTimezoneMismatch: "context_timezone_mismatch",
  ContextLocaleMismatch: "context_locale_mismatch",
  ContextLineCountryMismatch: "context_line_country_mismatch",
  PriorAbuseLink: "prior_abuse_link",
  TestScenario: "test_scenario",
  SharedApiKey: "shared_api_key",
} as const;
/**
 * A stable reason code. New codes may appear; ignore any you do not know.
 */
export type ReasonCode = OpenEnum<typeof ReasonCode>;

/** @internal */
export const ReasonCode$inboundSchema: z.ZodMiniType<ReasonCode, unknown> =
  openEnums.inboundSchema(ReasonCode);
