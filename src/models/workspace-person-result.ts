import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { PersonMatch, PersonMatch$inboundSchema } from "./person-match.js";
import {
  WorkspacePerson,
  WorkspacePerson$inboundSchema,
} from "./workspace-person.js";

/**
 * Create or reuse a workspace person.
 */
export type WorkspacePersonResult = {
  person: WorkspacePerson;
  suggestedMatches: Array<PersonMatch>;
  created: boolean;
};

/** @internal */
export const WorkspacePersonResult$inboundSchema: z.ZodMiniType<
  WorkspacePersonResult,
  unknown
> = z.pipe(
  z.object({
    person: WorkspacePerson$inboundSchema,
    suggested_matches: z.array(PersonMatch$inboundSchema),
    created: types.boolean(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "suggested_matches": "suggestedMatches",
    });
  }),
);

export function workspacePersonResultFromJSON(
  jsonString: string,
): SafeParseResult<WorkspacePersonResult, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WorkspacePersonResult$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WorkspacePersonResult' from JSON`,
  );
}
