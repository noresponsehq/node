import * as z from "zod/v4-mini";
import {
  IdentifierExpressionNodeLevelOne,
  IdentifierExpressionNodeLevelOne$Outbound,
  IdentifierExpressionNodeLevelOne$outboundSchema,
} from "./identifier-expression-node-level-one.js";
import {
  IdentifierSearch,
  IdentifierSearch$Outbound,
  IdentifierSearch$outboundSchema,
} from "./identifier-search.js";

export type IdentifierExpressionNodeLevelTwo = {
  /**
   * One customer-submitted identifier. Defaults to exact comparison of the original submitted value. canonical uses the supported identifier normalisation without an ownership claim: email preserves local-part case, NFC-normalises it and lowercases the domain without removing dots or tags; phone uses international E.164 without extensions or an inferred region; username uses NFC and Unicode case folding within the customer namespace. mailbox is email-only and explicitly selects existing list rules: case-insensitive, remove +tag, and ignore local-part dots at gmail.com and googlemail.com; googlemail.com maps to gmail.com. Username requires namespace customer. Email and phone forbid namespace. Source-discovered identifiers and platform handles are not searched. Unsupported kinds, namespaces, modes and invalid values return 400. Search equality does not establish verified ownership or merge accounts.
   */
  term?: IdentifierSearch | undefined;
  and?: Array<IdentifierExpressionNodeLevelOne> | undefined;
  or?: Array<IdentifierExpressionNodeLevelOne> | undefined;
};

/** @internal */
export type IdentifierExpressionNodeLevelTwo$Outbound = {
  term?: IdentifierSearch$Outbound | undefined;
  and?: Array<IdentifierExpressionNodeLevelOne$Outbound> | undefined;
  or?: Array<IdentifierExpressionNodeLevelOne$Outbound> | undefined;
};

/** @internal */
export const IdentifierExpressionNodeLevelTwo$outboundSchema: z.ZodMiniType<
  IdentifierExpressionNodeLevelTwo$Outbound,
  IdentifierExpressionNodeLevelTwo
> = z.object({
  term: z.optional(IdentifierSearch$outboundSchema),
  and: z.optional(z.array(IdentifierExpressionNodeLevelOne$outboundSchema)),
  or: z.optional(z.array(IdentifierExpressionNodeLevelOne$outboundSchema)),
});

export function identifierExpressionNodeLevelTwoToJSON(
  identifierExpressionNodeLevelTwo: IdentifierExpressionNodeLevelTwo,
): string {
  return JSON.stringify(
    IdentifierExpressionNodeLevelTwo$outboundSchema.parse(
      identifierExpressionNodeLevelTwo,
    ),
  );
}
