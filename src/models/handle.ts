import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * An account the person is known to hold.
 */
export type Handle = {
  /**
   * A platform a screening can cover, such as instagram, x, bluesky, youtube, tiktok or github. The screening registry owns the set: a request that names a platform it does not cover answers 422. A new platform adds an id without changing this contract, so read a platform you do not know in a response as one you have not seen before, not as an error. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.
   */
  platform: string;
  /**
   * The account's handle, without a leading @.
   */
  handle: string;
};

/** @internal */
export const Handle$inboundSchema: z.ZodMiniType<Handle, unknown> = z.object({
  platform: types.string(),
  handle: types.string(),
});
/** @internal */
export type Handle$Outbound = {
  platform: string;
  handle: string;
};

/** @internal */
export const Handle$outboundSchema: z.ZodMiniType<Handle$Outbound, Handle> = z
  .object({
    platform: z.string(),
    handle: z.string(),
  });

export function handleToJSON(handle: Handle): string {
  return JSON.stringify(Handle$outboundSchema.parse(handle));
}
export function handleFromJSON(
  jsonString: string,
): SafeParseResult<Handle, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Handle$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Handle' from JSON`,
  );
}
