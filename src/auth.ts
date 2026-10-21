/**
 * Auth context adapters. Hand-written; not generated.
 *
 * Each adapter maps claims your backend has already verified into the
 * `authContext` of an assessment request. Pass verified claims, not a raw token.
 */
import type { AuthContext } from "./models/auth-context.js";

export type VerifiedClaims = Record<string, unknown>;
export type AuthContextOverrides = Partial<AuthContext>;

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
function iso(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  // Whole UTC seconds (the fraction is truncated), as the Go and Python helpers write it.
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(Math.trunc(value) * 1000).toISOString().replace(".000Z", "Z");
  }
  return undefined;
}
// Defaults are the contract's bounds for roles and scopes (32 items of at
// most 64 characters); audiences are 8 x 256 and amr 8 x 32. The Go and
// Python helpers apply the same caps. Over-long values are dropped, not truncated.
function bounded(values: unknown[], limit: number, maxLength: number): string[] | undefined {
  const kept = values
    .filter((item): item is string => typeof item === "string" && item.length > 0 && [...item].length <= maxLength)
    .slice(0, limit);
  return kept.length ? kept : undefined;
}
function strings(value: unknown, limit = 32, maxLength = 64): string[] | undefined {
  if (typeof value === "string") return bounded(value.split(/\s+/), limit, maxLength);
  return Array.isArray(value) ? bounded(value, limit, maxLength) : undefined;
}
function delimitedStrings(value: unknown, limit = 32, maxLength = 64): string[] | undefined {
  if (typeof value !== "string") return strings(value, limit, maxLength);
  return bounded(value.split(/[\s,]+/).map((item) => item.trim()), limit, maxLength);
}
function audiences(value: unknown): string[] | undefined {
  return strings(value, 8, 256);
}
function object(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}
function actorPresent(value: unknown): boolean {
  const record = object(value);
  return Boolean(record ? (text(record["sub"]) ?? text(record["email"])) : text(value));
}
function defined<T extends object>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as T;
}

function base(
  provider: string,
  claims: VerifiedClaims,
  overrides: AuthContextOverrides = {},
  options: { includeIssuedAt?: boolean } = {},
): AuthContext {
  const issuer = text(overrides.issuer) ?? text(claims["iss"]);
  const subject = text(overrides.subject) ?? text(claims["sub"]);
  if (!issuer || !subject) throw new TypeError("NoResponse auth context requires a verified issuer and subject");
  const mergedAudiences = overrides.audiences ?? audiences(claims["aud"]);
  const context: AuthContext = { provider, issuer, subject, verified: true, transport: "backend" };
  if (mergedAudiences?.length) {
    context.audiences = mergedAudiences;
    context.audience = overrides.audience ?? mergedAudiences[0]!;
  }
  const issuedAt = iso(claims["iat"]);
  if (options.includeIssuedAt !== false && issuedAt) context.issuedAt = issuedAt;
  const expiresAt = iso(claims["exp"]);
  if (expiresAt) context.expiresAt = expiresAt;
  const authTime = iso(claims["auth_time"]);
  if (authTime) context.authTime = authTime;
  const sessionId = text(claims["sid"]);
  if (sessionId) context.sessionId = sessionId;
  const tokenId = text(claims["jti"]);
  if (tokenId) context.tokenId = tokenId;
  return { ...context, ...defined(overrides) };
}

/** Map verified WorkOS AuthKit claims plus verified user or session record overrides. */
export function fromWorkOS(claims: VerifiedClaims, overrides: AuthContextOverrides = {}): AuthContext {
  const defaults: AuthContextOverrides = {
    organizationId: text(claims["org_id"]),
    roles: strings(claims["roles"] ?? claims["role"]),
    scopes: strings(claims["permissions"]),
    impersonated: actorPresent(claims["act"]),
  };
  return base("workos", claims, { ...defaults, ...overrides });
}

/** Map verified Clerk session claims. Pass Session.createdAt as sessionCreatedAt. */
export function fromClerk(claims: VerifiedClaims, overrides: AuthContextOverrides = {}): AuthContext {
  const org = object(claims["o"]);
  const secondFactorAgeMinutes =
    Array.isArray(claims["fva"]) && typeof claims["fva"][1] === "number" && Number.isFinite(claims["fva"][1]) ? claims["fva"][1] : undefined;
  const mfa =
    secondFactorAgeMinutes !== undefined && secondFactorAgeMinutes >= 0
      ? { present: true, ageSeconds: Math.trunc(secondFactorAgeMinutes * 60) }
      : undefined;
  const defaults: AuthContextOverrides = {
    organizationId: text(org?.["id"]) ?? text(claims["org_id"]),
    // Clerk's role claim is one role slug, not a list.
    roles: bounded([org?.["rol"]], 32, 64) ?? bounded([claims["org_role"]], 32, 64),
    scopes: delimitedStrings(org?.["per"]) ?? delimitedStrings(claims["org_permissions"]),
    impersonated: actorPresent(claims["act"]),
    ...(mfa ? { mfa } : {}),
  };
  // iat is a 60-second token refresh clock, so it is not sent as issuedAt; session age is the sessionCreatedAt override.
  return base("clerk", claims, { ...defaults, ...overrides }, { includeIssuedAt: false });
}

/** Map verified Auth0 ID token, userinfo or normalised session claims. Do not pass an opaque API access token. */
export function fromAuth0(claims: VerifiedClaims, overrides: AuthContextOverrides = {}): AuthContext {
  const amr = strings(claims["amr"], 8, 32);
  const mfaMethods = amr?.filter((method) => method.toLowerCase() !== "pwd");
  const defaults: AuthContextOverrides = {
    organizationId: text(claims["org_id"]),
    scopes: strings(claims["scope"]) ?? strings(claims["permissions"]),
    emailVerified: typeof claims["email_verified"] === "boolean" ? claims["email_verified"] : undefined,
    phoneVerified: typeof claims["phone_number_verified"] === "boolean" ? claims["phone_number_verified"] : undefined,
    impersonated: actorPresent(claims["act"]),
    ...(mfaMethods?.length
      ? { mfa: { present: amr?.some((method) => method.toLowerCase() === "mfa") ?? false, methods: mfaMethods } }
      : {}),
  };
  return base("auth0", claims, { ...defaults, ...overrides });
}

/** Generic OIDC adapter for providers without a first-class helper. `provider` is a lowercase slug. */
export function fromOIDC(provider: string, claims: VerifiedClaims, overrides: AuthContextOverrides = {}): AuthContext {
  if (!/^[a-z0-9][a-z0-9._-]{1,31}$/.test(provider)) throw new TypeError("provider must be a lowercase provider slug");
  return base(provider, claims, overrides);
}
