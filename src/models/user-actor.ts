import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type UserActor = {
  type: "user";
  /**
   * The user's id at the identity provider the console signs people in with: 1 to 256 printable ASCII characters with no space, compared exactly.
   */
  externalUserId: string;
  /**
   * The public id of the console credential the user acted through.
   */
  consoleCredentialId: string;
  /**
   * Stable workspace principal id, retained across identity-provider subject migration. Absent for older events.
   */
  principalId?: string | undefined;
};

/** @internal */
export const UserActor$inboundSchema: z.ZodMiniType<UserActor, unknown> = z
  .pipe(
    z.object({
      type: types.literal("user"),
      external_user_id: types.string(),
      console_credential_id: types.string(),
      principal_id: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "external_user_id": "externalUserId",
        "console_credential_id": "consoleCredentialId",
        "principal_id": "principalId",
      });
    }),
  );
/** @internal */
export type UserActor$Outbound = {
  type: "user";
  external_user_id: string;
  console_credential_id: string;
  principal_id?: string | undefined;
};

/** @internal */
export const UserActor$outboundSchema: z.ZodMiniType<
  UserActor$Outbound,
  UserActor
> = z.pipe(
  z.object({
    type: z.literal("user"),
    externalUserId: z.string(),
    consoleCredentialId: z.string(),
    principalId: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      externalUserId: "external_user_id",
      consoleCredentialId: "console_credential_id",
      principalId: "principal_id",
    });
  }),
);

export function userActorToJSON(userActor: UserActor): string {
  return JSON.stringify(UserActor$outboundSchema.parse(userActor));
}
export function userActorFromJSON(
  jsonString: string,
): SafeParseResult<UserActor, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => UserActor$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'UserActor' from JSON`,
  );
}
