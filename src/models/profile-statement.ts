import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Basis, Basis$inboundSchema } from "./basis.js";
import { Certainty, Certainty$inboundSchema } from "./certainty.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ProfileCitation,
  ProfileCitation$inboundSchema,
} from "./profile-citation.js";
import { Topic, Topic$inboundSchema } from "./topic.js";

export type ProfileStatement = {
  topic: Topic;
  text: string;
  /**
   * confirmed: a linked record or the searched identifier states it directly. likely: a strong inference. possible: a weak inference.
   */
  certainty: Certainty;
  /**
   * stated: read from a record. inferred: reasoned from several facts. absence: every source answered and none found it.
   */
  basis: Basis;
  /**
   * Other explanations to keep open for an inference.
   */
  alternatives: Array<string>;
  /**
   * Every record, post or check the statement rests on.
   */
  evidence: Array<ProfileCitation>;
};

/** @internal */
export const ProfileStatement$inboundSchema: z.ZodMiniType<
  ProfileStatement,
  unknown
> = z.object({
  topic: Topic$inboundSchema,
  text: types.string(),
  certainty: Certainty$inboundSchema,
  basis: Basis$inboundSchema,
  alternatives: z.array(types.string()),
  evidence: z.array(ProfileCitation$inboundSchema),
});

export function profileStatementFromJSON(
  jsonString: string,
): SafeParseResult<ProfileStatement, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ProfileStatement$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ProfileStatement' from JSON`,
  );
}
