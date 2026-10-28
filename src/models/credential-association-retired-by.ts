import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type CredentialAssociationRetiredBy = {
  type: "api_key";
  keyId: string;
};

/** @internal */
export const CredentialAssociationRetiredBy$inboundSchema: z.ZodMiniType<
  CredentialAssociationRetiredBy,
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

export function credentialAssociationRetiredByFromJSON(
  jsonString: string,
): SafeParseResult<CredentialAssociationRetiredBy, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CredentialAssociationRetiredBy$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CredentialAssociationRetiredBy' from JSON`,
  );
}
