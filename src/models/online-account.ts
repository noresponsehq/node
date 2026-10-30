import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountType,
  AccountType$inboundSchema,
  AccountType$outboundSchema,
} from "./account-type.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  FailureReason,
  FailureReason$inboundSchema,
  FailureReason$outboundSchema,
} from "./failure-reason.js";
import {
  Identifier,
  Identifier$inboundSchema,
  Identifier$outboundSchema,
} from "./identifier.js";
import {
  SignalOutcome,
  SignalOutcome$inboundSchema,
  SignalOutcome$outboundSchema,
} from "./signal-outcome.js";

export const SignIn = {
  Password: "password",
  Google: "google",
  Facebook: "facebook",
  Apple: "apple",
  Microsoft: "microsoft",
  Sso: "sso",
  Other: "other",
} as const;
export type SignIn = OpenEnum<typeof SignIn>;

/**
 * One online-account search of the signup's email or username, detailed view only. name and domain name the platform searched, not a provider. outcome is the search's signal outcome: found, not_found, or a failure (blocked, unavailable, inconclusive) with its reason; a failure is not reported as not_found. The members after reason are what the platform returned beside an account it found, each absent when it did not say.
 */
export type OnlineAccount = {
  /**
   * The platform's name, such as Adobe or GitHub.
   */
  name: string;
  /**
   * The platform's domain, lower case: the host its logo is fetched for.
   */
  domain: string;
  identifier: Identifier;
  /**
   * Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.
   */
  outcome: SignalOutcome;
  /**
   * Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.
   */
  reason?: FailureReason | undefined;
  /**
   * How the account signs in, as the platform reports it, sorted: a password, a Google, Facebook, Apple or Microsoft account, the organisation's single sign-on, or another method.
   */
  signIn?: Array<SignIn> | undefined;
  /**
   * Whether the platform says the account's email is verified.
   */
  emailVerified?: boolean | undefined;
  /**
   * Whether the platform says the account is blocked or suspended.
   */
  blocked?: boolean | undefined;
  /**
   * personal, or business: an account a company or school manages.
   */
  accountType?: AccountType | undefined;
  /**
   * Whether the account has its own profile picture rather than the platform's default. The picture is not returned.
   */
  hasAvatar?: boolean | undefined;
  /**
   * The first letters of the account holder's first name, as the platform shows them (Life360 shows two and hides the rest). It is evidence only: it does not change the score or the consistency results.
   */
  firstNamePrefix?: string | undefined;
};

/** @internal */
export const SignIn$inboundSchema: z.ZodMiniType<SignIn, unknown> = openEnums
  .inboundSchema(SignIn);
/** @internal */
export const SignIn$outboundSchema: z.ZodMiniType<string, SignIn> = openEnums
  .outboundSchema(SignIn);

/** @internal */
export const OnlineAccount$inboundSchema: z.ZodMiniType<
  OnlineAccount,
  unknown
> = z.pipe(
  z.object({
    name: types.string(),
    domain: types.string(),
    identifier: Identifier$inboundSchema,
    outcome: SignalOutcome$inboundSchema,
    reason: types.optional(FailureReason$inboundSchema),
    sign_in: types.optional(z.array(SignIn$inboundSchema)),
    email_verified: types.optional(types.boolean()),
    blocked: types.optional(types.boolean()),
    account_type: types.optional(AccountType$inboundSchema),
    has_avatar: types.optional(types.boolean()),
    first_name_prefix: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "sign_in": "signIn",
      "email_verified": "emailVerified",
      "account_type": "accountType",
      "has_avatar": "hasAvatar",
      "first_name_prefix": "firstNamePrefix",
    });
  }),
);
/** @internal */
export type OnlineAccount$Outbound = {
  name: string;
  domain: string;
  identifier: string;
  outcome: string;
  reason?: string | undefined;
  sign_in?: Array<string> | undefined;
  email_verified?: boolean | undefined;
  blocked?: boolean | undefined;
  account_type?: string | undefined;
  has_avatar?: boolean | undefined;
  first_name_prefix?: string | undefined;
};

/** @internal */
export const OnlineAccount$outboundSchema: z.ZodMiniType<
  OnlineAccount$Outbound,
  OnlineAccount
> = z.pipe(
  z.object({
    name: z.string(),
    domain: z.string(),
    identifier: Identifier$outboundSchema,
    outcome: SignalOutcome$outboundSchema,
    reason: z.optional(FailureReason$outboundSchema),
    signIn: z.optional(z.array(SignIn$outboundSchema)),
    emailVerified: z.optional(z.boolean()),
    blocked: z.optional(z.boolean()),
    accountType: z.optional(AccountType$outboundSchema),
    hasAvatar: z.optional(z.boolean()),
    firstNamePrefix: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      signIn: "sign_in",
      emailVerified: "email_verified",
      accountType: "account_type",
      hasAvatar: "has_avatar",
      firstNamePrefix: "first_name_prefix",
    });
  }),
);

export function onlineAccountToJSON(onlineAccount: OnlineAccount): string {
  return JSON.stringify(OnlineAccount$outboundSchema.parse(onlineAccount));
}
export function onlineAccountFromJSON(
  jsonString: string,
): SafeParseResult<OnlineAccount, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => OnlineAccount$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'OnlineAccount' from JSON`,
  );
}
