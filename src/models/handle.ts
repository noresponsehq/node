import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  HandlePlatform,
  HandlePlatform$inboundSchema,
  HandlePlatform$outboundSchema,
} from "./handle-platform.js";

/**
 * An account the attendee is known to hold.
 */
export type Handle = {
  /**
   * A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.
   */
  platform: HandlePlatform;
  /**
   * The account's handle, without a leading @.
   */
  handle: string;
};

/** @internal */
export const Handle$inboundSchema: z.ZodMiniType<Handle, unknown> = z.object({
  platform: HandlePlatform$inboundSchema,
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
    platform: HandlePlatform$outboundSchema,
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
