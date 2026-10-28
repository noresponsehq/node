import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AccountOutcomeActor = {
  type: "api_key";
  keyId: string;
};

/** @internal */
export const AccountOutcomeActor$inboundSchema: z.ZodMiniType<
  AccountOutcomeActor,
  unknown
> = z.pipe(
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

export function accountOutcomeActorFromJSON(
  jsonString: string,
): SafeParseResult<AccountOutcomeActor, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountOutcomeActor$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountOutcomeActor' from JSON`,
  );
}
