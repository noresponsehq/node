import assert from "node:assert/strict";
import test from "node:test";
import * as z from "zod/v4-mini";
import { AuthContext$outboundSchema, fromAuth0, fromClerk, fromOIDC, fromWorkOS } from "../dist/esm/index.js";
import { fixture } from "./helpers.mjs";

/** The wire form (snake_case), as the request body carries it. */
const wire = (context) => JSON.parse(JSON.stringify(z.parse(AuthContext$outboundSchema, context)));
const camel = (key) => key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
const camelize = (value) =>
  Array.isArray(value) ? value.map(camelize) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).map(([k, v]) => [camel(k), camelize(v)])) : value;

test("auth adapters normalise verified provider claims and preserve audience arrays", () => {
  const claims = {
    iss: "https://tenant.example",
    sub: "user_123",
    aud: ["api://signup", "api://identity"],
    sid: "sess_123",
    jti: "tok_123",
    iat: 1700000000,
    exp: 1700003600,
    org_id: "org_123",
  };
  const clerk = fromClerk({ ...claims, v: 2, fva: [7, 1], o: { id: "org_v2", rol: "admin", per: "read,manage" }, act: { sub: "support" } }, { sessionCreatedAt: "2026-10-19T18:00:00Z" });
  assert.equal(clerk.provider, "clerk");
  assert.deepEqual(clerk.audiences, ["api://signup", "api://identity"]);
  assert.equal(clerk.audience, "api://signup");
  assert.equal(clerk.organizationId, "org_v2");
  assert.deepEqual(clerk.roles, ["admin"]);
  assert.deepEqual(clerk.scopes, ["read", "manage"]);
  assert.deepEqual(clerk.mfa, { present: true, ageSeconds: 60 });
  assert.equal(clerk.sessionCreatedAt, "2026-10-19T18:00:00Z");
  assert.equal(clerk.issuedAt, undefined);
  assert.equal(clerk.impersonated, true);
  assert.equal(clerk.verified, true);
  assert.equal(clerk.transport, "backend");
  assert.equal(fromWorkOS(claims).provider, "workos");
  const auth0 = fromAuth0({ ...claims, email_verified: true, phone_number_verified: true, amr: ["pwd", "mfa"], act: { sub: "agent" } });
  assert.equal(auth0.mfa.present, true);
  assert.deepEqual(auth0.mfa.methods, ["mfa"]);
  assert.equal(auth0.phoneVerified, true);
  assert.equal(auth0.impersonated, true);
  assert.equal(fromOIDC("customidp", claims).provider, "customidp");
  assert.throws(() => fromOIDC("customidp", { sub: "missing-issuer" }), /issuer and subject/);
  assert.throws(() => fromOIDC("Bad Slug", claims), /slug/);
  assert.deepEqual(wire(fromOIDC("customidp", claims)), {
    provider: "customidp", issuer: "https://tenant.example", subject: "user_123",
    audience: "api://signup", audiences: ["api://signup", "api://identity"],
    issued_at: "2023-11-14T22:13:20Z", expires_at: "2023-11-14T23:13:20Z",
    session_id: "sess_123", token_id: "tok_123", verified: true, transport: "backend",
  });
});

test("provider records override token omissions and Clerk -1 means no MFA", () => {
  const workos = fromWorkOS({ iss: "https://workos.example", sub: "user_1", email_verified: false, phone_verified: true, act: { sub: "support" } }, {
    emailVerified: true, accountCreatedAt: "2026-01-01T00:00:00Z", sessionCreatedAt: "2026-10-19T18:00:00Z",
  });
  assert.equal(workos.emailVerified, true);
  assert.equal(workos.phoneVerified, undefined);
  assert.equal(workos.impersonated, true);
  const clerk = fromClerk({ iss: "https://clerk.example", sub: "user_1", fva: [7, -1] });
  assert.equal(clerk.mfa, undefined);
});

test("auth mappers apply the auth-context caps", () => {
  const range = (count, prefix) => Array.from({ length: count }, (_, i) => prefix + String(i).padStart(2, "0"));
  const claims = {
    iss: "https://tenant.example", sub: "user_1",
    aud: ["api://" + "a".repeat(251), ...range(10, "api://aud")],
    permissions: ["p".repeat(65), ...range(40, "signup:write:")],
    roles: range(40, "role"),
    amr: ["m".repeat(33), ...range(10, "otp")],
  };
  const workos = fromWorkOS(claims);
  assert.deepEqual(workos.audiences, range(8, "api://aud"));
  assert.equal(workos.audience, "api://aud00");
  assert.deepEqual(workos.scopes, range(32, "signup:write:"));
  assert.deepEqual(workos.roles, range(32, "role"));
  const auth0 = fromAuth0(claims);
  assert.deepEqual(auth0.mfa.methods, range(8, "otp"));
});

test("auth mappers match the cross-SDK auth-context vectors", () => {
  const { cases } = fixture("auth-context-vectors.json");
  assert.ok(cases.length > 0);
  const mappers = { workos: fromWorkOS, clerk: fromClerk, auth0: fromAuth0 };
  for (const vector of cases) {
    const overrides = camelize(vector.overrides);
    const mapper = mappers[vector.provider];
    const got = mapper ? mapper(vector.claims, overrides) : fromOIDC(vector.provider, vector.claims, overrides);
    assert.deepEqual(wire(got), vector.expect, vector.name);
  }
});
