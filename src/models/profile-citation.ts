import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ProfileCitationKind,
  ProfileCitationKind$inboundSchema,
} from "./profile-citation-kind.js";

export type ProfileCitation = {
  /**
   * record: a record in lookup.records or profiles[].record. post: an item in posts. check: an item in lookup.checks.
   */
  kind: ProfileCitationKind;
  /**
   * The record or post id. For a check, c followed by its 1-based position in lookup.checks.
   */
  id: string;
};

/** @internal */
export const ProfileCitation$inboundSchema: z.ZodMiniType<
  ProfileCitation,
  unknown
> = z.object({
  kind: ProfileCitationKind$inboundSchema,
  id: types.string(),
});

export function profileCitationFromJSON(
  jsonString: string,
): SafeParseResult<ProfileCitation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ProfileCitation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ProfileCitation' from JSON`,
  );
}
