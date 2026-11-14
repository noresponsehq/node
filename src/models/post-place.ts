import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * A place a post names, as the platform shows it.
 */
export type PostPlace = {
  name: string;
  /**
   * The platform's own id of the place.
   */
  id?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
};

/** @internal */
export const PostPlace$inboundSchema: z.ZodMiniType<PostPlace, unknown> = z
  .object({
    name: types.string(),
    id: types.optional(types.string()),
    address: types.optional(types.string()),
    city: types.optional(types.string()),
    latitude: types.optional(types.number()),
    longitude: types.optional(types.number()),
  });

export function postPlaceFromJSON(
  jsonString: string,
): SafeParseResult<PostPlace, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PostPlace$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PostPlace' from JSON`,
  );
}
