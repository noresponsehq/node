import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ProfileCitation,
  ProfileCitation$inboundSchema,
} from "./profile-citation.js";

export type ProfileLead = {
  /**
   * A value copied exactly from a linked record that the person was not searched by.
   */
  value: string;
  kind: string;
  why: string;
  evidence: Array<ProfileCitation>;
};

/** @internal */
export const ProfileLead$inboundSchema: z.ZodMiniType<ProfileLead, unknown> = z
  .object({
    value: types.string(),
    kind: types.string(),
    why: types.string(),
    evidence: z.array(ProfileCitation$inboundSchema),
  });

export function profileLeadFromJSON(
  jsonString: string,
): SafeParseResult<ProfileLead, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ProfileLead$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ProfileLead' from JSON`,
  );
}
