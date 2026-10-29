import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The credential namespace of the creator. An external user ID equal to an API-key label does not grant ownership of that key's private view.
 */
export const OwnerType = {
  User: "user",
  ApiKey: "api_key",
} as const;
/**
 * The credential namespace of the creator. An external user ID equal to an API-key label does not grant ownership of that key's private view.
 */
export type OwnerType = OpenEnum<typeof OwnerType>;

/** @internal */
export const OwnerType$inboundSchema: z.ZodMiniType<OwnerType, unknown> =
  openEnums.inboundSchema(OwnerType);
