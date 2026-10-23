import { createHash } from "node:crypto";

/**
 * SHA-256 of an API key your platform issued to the new account, as 64
 * lower-case hex characters. The key never leaves your backend: send only this
 * hash, as `issuedCredential.sha256` on the assessment request. The key is
 * hashed as its UTF-8 bytes exactly as given, with no trimming or
 * normalisation. An empty key throws a TypeError.
 */
export function hashIssuedCredential(key: string): string {
  if (typeof key !== "string" || key.length === 0) {
    throw new TypeError("issued key must be a non-empty string");
  }
  return createHash("sha256").update(key, "utf8").digest("hex");
}
