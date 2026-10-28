import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AccountBindingActor = {
  type: "api_key";
  keyId: string;
};

/** @internal */
export const AccountBindingActor$inboundSchema: z.ZodMiniType<
  AccountBindingActor,
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

export function accountBindingActorFromJSON(
  jsonString: string,
): SafeParseResult<AccountBindingActor, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountBindingActor$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountBindingActor' from JSON`,
  );
}
