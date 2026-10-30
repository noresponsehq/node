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
 * One satisfied unique term in an identifier expression. term_index is the zero-based depth-first raw leaf position of its first occurrence. Duplicate normalized terms produce one witness. All satisfied unique terms are returned, ordered by term_index, including satisfied terms in an OR branch that was not needed. value preserves the original submitted value in assessment_id. In assessment scope all witnesses belong to the same matching assessment; account search chooses the newest such assessment. In account scope each term uses its newest retained matching assessment, so witnesses may have different assessment IDs. This evidence does not assert ownership or equality between accounts.
 */
export type IdentifierTermMatch = {
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
  /**
   * Zero-based depth-first position of the first occurrence of this normalized term in the submitted expression.
   */
  termIndex: number;
};

/** @internal */
export const IdentifierTermMatch$inboundSchema: z.ZodMiniType<
  IdentifierTermMatch,
  unknown
> = z.pipe(
  z.object({
    kind: IdentifierSearchKind$inboundSchema,
    value: types.string(),
    match_basis: Match$inboundSchema,
    provenance: Provenance$inboundSchema,
    namespace: types.optional(Namespace$inboundSchema),
    assessment_id: types.string(),
    term_index: types.number(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "match_basis": "matchBasis",
      "assessment_id": "assessmentId",
      "term_index": "termIndex",
    });
  }),
);

export function identifierTermMatchFromJSON(
  jsonString: string,
): SafeParseResult<IdentifierTermMatch, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => IdentifierTermMatch$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'IdentifierTermMatch' from JSON`,
  );
}
