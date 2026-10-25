import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Key, Key$inboundSchema } from "./key.js";

/**
 * GET /v1/workspaces/{workspace_id}/keys: the keys of both of the workspace's environments, newest first, at most 200 of each, revoked and expired keys included. No item carries a secret.
 */
export type KeyList = {
  items: Array<Key>;
};

/** @internal */
export const KeyList$inboundSchema: z.ZodMiniType<KeyList, unknown> = z.object({
  items: z.array(Key$inboundSchema),
});

export function keyListFromJSON(
  jsonString: string,
): SafeParseResult<KeyList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => KeyList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'KeyList' from JSON`,
  );
}
