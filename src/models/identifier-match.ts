import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  IdentifierSearchKind,
  IdentifierSearchKind$inboundSchema,
} from "./identifier-search-kind.js";
import { Match, Match$inboundSchema } from "./match.js";
import { Namespace, Namespace$inboundSchema } from "./namespace.js";
import { Provenance, Provenance$inboundSchema } from "./provenance.js";

/**
 * Why this result matched a typed identifier search. value is the original value submitted in assessment_id. Provenance records a customer submission, not a source discovery or verified ownership. Equality is deterministic and has no inferred confidence score. An account result names its newest retained matching assessment, which can differ from latest.
 */
export type IdentifierMatch = {
  kind: IdentifierSearchKind;
  value: string;
  /**
   * exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.
   */
  matchBasis: Match;
  /**
   * Customer-submitted input. It does not mean the customer or NoResponse verified ownership.
   */
  provenance: Provenance;
  /**
   * Required for username: the username submitted by this customer in this workspace/environment. It does not name or join a source platform. Omit for email and phone.
   */
  namespace?: Namespace | undefined;
  /**
   * Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.
   */
  assessmentId: string;
};

/** @internal */
export const IdentifierMatch$inboundSchema: z.ZodMiniType<
  IdentifierMatch,
  unknown
> = z.pipe(
  z.object({
    kind: IdentifierSearchKind$inboundSchema,
    value: types.string(),
    match_basis: Match$inboundSchema,
    provenance: Provenance$inboundSchema,
    namespace: types.optional(Namespace$inboundSchema),
    assessment_id: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "match_basis": "matchBasis",
      "assessment_id": "assessmentId",
    });
  }),
);

export function identifierMatchFromJSON(
  jsonString: string,
): SafeParseResult<IdentifierMatch, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => IdentifierMatch$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'IdentifierMatch' from JSON`,
  );
}
