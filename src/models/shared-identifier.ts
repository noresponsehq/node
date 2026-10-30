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
import {
  IdentifierSubmission,
  IdentifierSubmission$inboundSchema,
} from "./identifier-submission.js";
import { Match, Match$inboundSchema } from "./match.js";
import { Namespace, Namespace$inboundSchema } from "./namespace.js";
import { Provenance, Provenance$inboundSchema } from "./provenance.js";

export type SharedIdentifier = {
  kind: IdentifierSearchKind;
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
  account: IdentifierSubmission;
  linkedAccount: IdentifierSubmission;
};

/** @internal */
export const SharedIdentifier$inboundSchema: z.ZodMiniType<
  SharedIdentifier,
  unknown
> = z.pipe(
  z.object({
    kind: IdentifierSearchKind$inboundSchema,
    match_basis: Match$inboundSchema,
    provenance: Provenance$inboundSchema,
    namespace: types.optional(Namespace$inboundSchema),
    account: IdentifierSubmission$inboundSchema,
    linked_account: IdentifierSubmission$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "match_basis": "matchBasis",
      "linked_account": "linkedAccount",
    });
  }),
);

export function sharedIdentifierFromJSON(
  jsonString: string,
): SafeParseResult<SharedIdentifier, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SharedIdentifier$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SharedIdentifier' from JSON`,
  );
}
