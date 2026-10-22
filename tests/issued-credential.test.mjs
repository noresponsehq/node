import assert from "node:assert/strict";
import test from "node:test";
import { hashIssuedCredential } from "../dist/esm/index.js";
import { fixture } from "./helpers.mjs";

test("hashIssuedCredential matches the cross-SDK vectors", () => {
  const { cases } = fixture("issued-credential-vectors.json");
  assert.ok(cases.length > 0);
  for (const c of cases) assert.equal(hashIssuedCredential(c.key), c.sha256, c.key);
});

test("hashIssuedCredential refuses an empty key", () => {
  assert.throws(() => hashIssuedCredential(""), TypeError);
});
