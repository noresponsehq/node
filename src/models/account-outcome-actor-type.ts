import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const AccountOutcomeActorType = {
  ApiKey: "api_key",
  User: "user",
} as const;
export type AccountOutcomeActorType = OpenEnum<typeof AccountOutcomeActorType>;

/** @internal */
export const AccountOutcomeActorType$inboundSchema: z.ZodMiniType<
  AccountOutcomeActorType,
  unknown
> = openEnums.inboundSchema(AccountOutcomeActorType);
