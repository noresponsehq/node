import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * A person the group protects.
 */
export type Principal = {
  /**
   * The principal's name.
   */
  name: string;
  /**
   * Other names the principal goes by, at most 10.
   */
  aliases?: Array<string> | undefined;
};

/** @internal */
export const Principal$inboundSchema: z.ZodMiniType<Principal, unknown> = z
  .object({
    name: types.string(),
    aliases: types.optional(z.array(types.string())),
  });
/** @internal */
export type Principal$Outbound = {
  name: string;
  aliases?: Array<string> | undefined;
};

/** @internal */
export const Principal$outboundSchema: z.ZodMiniType<
  Principal$Outbound,
  Principal
> = z.object({
  name: z.string(),
  aliases: z.optional(z.array(z.string())),
});

export function principalToJSON(principal: Principal): string {
  return JSON.stringify(Principal$outboundSchema.parse(principal));
}
export function principalFromJSON(
  jsonString: string,
): SafeParseResult<Principal, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Principal$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Principal' from JSON`,
  );
}
