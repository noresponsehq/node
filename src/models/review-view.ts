import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Filter, Filter$inboundSchema } from "./filter.js";
import { OwnerType, OwnerType$inboundSchema } from "./owner-type.js";

export type ReviewView = {
  id: string;
  name: string;
  owner: string;
  /**
   * The credential namespace of the creator. An external user ID equal to an API-key label does not grant ownership of that key's private view.
   */
  ownerType: OwnerType;
  shared: boolean;
  version: number;
  filter: Filter;
  createdAt: string;
  updatedAt: string;
  /**
   * Immutable member ID or API key ID, interpreted with owner_type. Ownership survives changes to an external user identity.
   */
  ownerPrincipalId: string;
};

/** @internal */
export const ReviewView$inboundSchema: z.ZodMiniType<ReviewView, unknown> = z
  .pipe(
    z.object({
      id: types.string(),
      name: types.string(),
      owner: types.string(),
      owner_type: OwnerType$inboundSchema,
      shared: types.boolean(),
      version: types.number(),
      filter: Filter$inboundSchema,
      created_at: types.string(),
      updated_at: types.string(),
      owner_principal_id: types.string(),
    }),
    z.transform((v) => {
      return remap$(v, {
        "owner_type": "ownerType",
        "created_at": "createdAt",
        "updated_at": "updatedAt",
        "owner_principal_id": "ownerPrincipalId",
      });
    }),
  );

export function reviewViewFromJSON(
  jsonString: string,
): SafeParseResult<ReviewView, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ReviewView$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ReviewView' from JSON`,
  );
}
