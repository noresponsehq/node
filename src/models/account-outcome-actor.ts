import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountOutcomeActorType,
  AccountOutcomeActorType$inboundSchema,
} from "./account-outcome-actor-type.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type AccountOutcomeActor = {
  type: AccountOutcomeActorType;
  keyId?: string | undefined;
  /**
   * The user's id at the identity provider the console signs people in with: 1 to 256 printable ASCII characters with no space, compared exactly.
   */
  externalUserId?: string | undefined;
  consoleCredentialId?: string | undefined;
  /**
   * Opaque, server-assigned member id: mem_ and a 26-character ULID. It stays the same when a removed member is invited back.
   */
  principalId?: string | undefined;
};

/** @internal */
export const AccountOutcomeActor$inboundSchema: z.ZodMiniType<
  AccountOutcomeActor,
  unknown
> = z.pipe(
  z.object({
    type: AccountOutcomeActorType$inboundSchema,
    key_id: types.optional(types.string()),
    external_user_id: types.optional(types.string()),
    console_credential_id: types.optional(types.string()),
    principal_id: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "key_id": "keyId",
      "external_user_id": "externalUserId",
      "console_credential_id": "consoleCredentialId",
      "principal_id": "principalId",
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
