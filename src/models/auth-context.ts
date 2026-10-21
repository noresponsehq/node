import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  AssuranceLevel,
  AssuranceLevel$outboundSchema,
} from "./assurance-level.js";
import {
  AuthContextMfa,
  AuthContextMfa$Outbound,
  AuthContextMfa$outboundSchema,
} from "./auth-context-mfa.js";
import { Transport, Transport$outboundSchema } from "./transport.js";

/**
 * Normalised claims from a session your backend has already verified with WorkOS, Clerk, Auth0 or any OIDC provider. Pass the output of the SDK's auth adapters, not a raw token.
 */
export type AuthContext = {
  /**
   * Lowercase provider slug. WorkOS, Clerk and Auth0 have first-class adapters; every other provider uses a customer-specific OIDC slug. Provider brand is metadata; it does not change risk by itself.
   */
  provider: string;
  /**
   * The verified token issuer, normally the provider's HTTPS issuer URL.
   */
  issuer: string;
  /**
   * The verified audience/resource identifier used by the customer's API. Use audiences when the provider emits multiple values.
   */
  audience?: string | undefined;
  /**
   * All verified audience/resource identifiers from an OAuth or OIDC token. The first value may also be copied to audience for simple integrations.
   */
  audiences?: Array<string> | undefined;
  /**
   * The verified stable subject identifier (`sub`), opaque to NoResponse.
   */
  subject: string;
  /**
   * The verified session identifier (`sid` or provider equivalent).
   */
  sessionId?: string | undefined;
  /**
   * The active organization or workspace identifier, when the provider issued one.
   */
  organizationId?: string | undefined;
  /**
   * The provider tenant identifier, when distinct from organization_id.
   */
  tenantId?: string | undefined;
  /**
   * The verified token identifier (`jti`), used for replay and rotation correlation.
   */
  tokenId?: string | undefined;
  /**
   * Verified token issue time (`iat`).
   */
  issuedAt?: string | undefined;
  /**
   * Verified token expiry (`exp`).
   */
  expiresAt?: string | undefined;
  /**
   * Creation time of the provider session from the verified backend session record (for example Clerk Session.createdAt or WorkOS Session.created_at). This is separate from token issuance and auth_time.
   */
  sessionCreatedAt?: string | undefined;
  /**
   * Verified end-user authentication time (`auth_time`), when present.
   */
  authTime?: string | undefined;
  /**
   * Account creation time from the customer's verified provider record, when available.
   */
  accountCreatedAt?: string | undefined;
  /**
   * Whether the customer's provider asserts that the email identifier was verified.
   */
  emailVerified?: boolean | undefined;
  /**
   * Whether the customer's provider asserts that the phone identifier was verified.
   */
  phoneVerified?: boolean | undefined;
  /**
   * Provider or OIDC assurance level, when the customer has mapped one.
   */
  assuranceLevel?: AssuranceLevel | undefined;
  /**
   * Whether the verified session is acting on behalf of another subject.
   */
  impersonated?: boolean | undefined;
  /**
   * Where the customer derived this context. Backend is the trusted integration path; browser values are treated as weak hints.
   */
  transport?: Transport | undefined;
  /**
   * Whether the customer completed signature, issuer, audience and expiry validation before calling NoResponse. False contexts are accepted only as weak hints.
   */
  verified: boolean;
  /**
   * Normalized multi-factor evidence from a verified provider session.
   */
  mfa?: AuthContextMfa | undefined;
  /**
   * Bounded role slugs from the verified provider; roles do not change risk by themselves.
   */
  roles?: Array<string> | undefined;
  /**
   * Bounded scopes from the verified access token; scopes do not change risk by themselves.
   */
  scopes?: Array<string> | undefined;
};

/** @internal */
export type AuthContext$Outbound = {
  provider: string;
  issuer: string;
  audience?: string | undefined;
  audiences?: Array<string> | undefined;
  subject: string;
  session_id?: string | undefined;
  organization_id?: string | undefined;
  tenant_id?: string | undefined;
  token_id?: string | undefined;
  issued_at?: string | undefined;
  expires_at?: string | undefined;
  session_created_at?: string | undefined;
  auth_time?: string | undefined;
  account_created_at?: string | undefined;
  email_verified?: boolean | undefined;
  phone_verified?: boolean | undefined;
  assurance_level?: string | undefined;
  impersonated?: boolean | undefined;
  transport?: string | undefined;
  verified: boolean;
  mfa?: AuthContextMfa$Outbound | undefined;
  roles?: Array<string> | undefined;
  scopes?: Array<string> | undefined;
};

/** @internal */
export const AuthContext$outboundSchema: z.ZodMiniType<
  AuthContext$Outbound,
  AuthContext
> = z.pipe(
  z.object({
    provider: z.string(),
    issuer: z.string(),
    audience: z.optional(z.string()),
    audiences: z.optional(z.array(z.string())),
    subject: z.string(),
    sessionId: z.optional(z.string()),
    organizationId: z.optional(z.string()),
    tenantId: z.optional(z.string()),
    tokenId: z.optional(z.string()),
    issuedAt: z.optional(z.string()),
    expiresAt: z.optional(z.string()),
    sessionCreatedAt: z.optional(z.string()),
    authTime: z.optional(z.string()),
    accountCreatedAt: z.optional(z.string()),
    emailVerified: z.optional(z.boolean()),
    phoneVerified: z.optional(z.boolean()),
    assuranceLevel: z.optional(AssuranceLevel$outboundSchema),
    impersonated: z.optional(z.boolean()),
    transport: z.optional(Transport$outboundSchema),
    verified: z.boolean(),
    mfa: z.optional(AuthContextMfa$outboundSchema),
    roles: z.optional(z.array(z.string())),
    scopes: z.optional(z.array(z.string())),
  }),
  z.transform((v) => {
    return remap$(v, {
      sessionId: "session_id",
      organizationId: "organization_id",
      tenantId: "tenant_id",
      tokenId: "token_id",
      issuedAt: "issued_at",
      expiresAt: "expires_at",
      sessionCreatedAt: "session_created_at",
      authTime: "auth_time",
      accountCreatedAt: "account_created_at",
      emailVerified: "email_verified",
      phoneVerified: "phone_verified",
      assuranceLevel: "assurance_level",
    });
  }),
);

export function authContextToJSON(authContext: AuthContext): string {
  return JSON.stringify(AuthContext$outboundSchema.parse(authContext));
}
