import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type KeyActor = {
  type: "api_key";
  /**
   * The public id of the workspace API key that made the change.
   */
  keyId: string;
};

/** @internal */
export const KeyActor$inboundSchema: z.ZodMiniType<KeyActor, unknown> = z.pipe(
  z.object({
    type: types.literal("api_key"),
    key_id: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "key_id": "keyId",
    });
  }),
);
/** @internal */
export type KeyActor$Outbound = {
  type: "api_key";
  key_id: string;
};

/** @internal */
export const KeyActor$outboundSchema: z.ZodMiniType<
  KeyActor$Outbound,
  KeyActor
> = z.pipe(
  z.object({
    type: z.literal("api_key"),
    keyId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      keyId: "key_id",
    });
  }),
);

export function keyActorToJSON(keyActor: KeyActor): string {
  return JSON.stringify(KeyActor$outboundSchema.parse(keyActor));
}
export function keyActorFromJSON(
  jsonString: string,
): SafeParseResult<KeyActor, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => KeyActor$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'KeyActor' from JSON`,
  );
}
