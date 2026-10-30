import * as z from "zod/v4-mini";
import {
  IdentifierExpressionNodeLevelTwo,
  IdentifierExpressionNodeLevelTwo$Outbound,
  IdentifierExpressionNodeLevelTwo$outboundSchema,
} from "./identifier-expression-node-level-two.js";
import {
  IdentifierSearch,
  IdentifierSearch$Outbound,
  IdentifierSearch$outboundSchema,
} from "./identifier-search.js";

export type IdentifierExpressionNode = {
  /**
   * One customer-submitted identifier. Defaults to exact comparison of the original submitted value. canonical uses the supported identifier normalisation without an ownership claim: email preserves local-part case, NFC-normalises it and lowercases the domain without removing dots or tags; phone uses international E.164 without extensions or an inferred region; username uses NFC and Unicode case folding within the customer namespace. mailbox is email-only and explicitly selects existing list rules: case-insensitive, remove +tag, and ignore local-part dots at gmail.com and googlemail.com; googlemail.com maps to gmail.com. Username requires namespace customer. Email and phone forbid namespace. Source-discovered identifiers and platform handles are not searched. Unsupported kinds, namespaces, modes and invalid values return 400. Search equality does not establish verified ownership or merge accounts.
   */
  term?: IdentifierSearch | undefined;
  and?: Array<IdentifierExpressionNodeLevelTwo> | undefined;
  or?: Array<IdentifierExpressionNodeLevelTwo> | undefined;
};

/** @internal */
export type IdentifierExpressionNode$Outbound = {
  term?: IdentifierSearch$Outbound | undefined;
  and?: Array<IdentifierExpressionNodeLevelTwo$Outbound> | undefined;
  or?: Array<IdentifierExpressionNodeLevelTwo$Outbound> | undefined;
};

/** @internal */
export const IdentifierExpressionNode$outboundSchema: z.ZodMiniType<
  IdentifierExpressionNode$Outbound,
  IdentifierExpressionNode
> = z.object({
  term: z.optional(IdentifierSearch$outboundSchema),
  and: z.optional(z.array(IdentifierExpressionNodeLevelTwo$outboundSchema)),
  or: z.optional(z.array(IdentifierExpressionNodeLevelTwo$outboundSchema)),
});

export function identifierExpressionNodeToJSON(
  identifierExpressionNode: IdentifierExpressionNode,
): string {
  return JSON.stringify(
    IdentifierExpressionNode$outboundSchema.parse(identifierExpressionNode),
  );
}
