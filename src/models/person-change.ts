import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PersonChangeKind,
  PersonChangeKind$inboundSchema,
} from "./person-change-kind.js";
import { Significance, Significance$inboundSchema } from "./significance.js";

export type PersonChange = {
  id: string;
  /**
   * account_added and account_removed: an account or profile appeared or disappeared. breach_added and breach_removed: a breach record appeared or disappeared. identifier_added and identifier_removed: an email, phone, username, name or account id on an account the person already held. field_changed: another field on such an account. posts_added: new posts, counted in count.
   */
  kind: PersonChangeKind;
  /**
   * One rule ranks every change: identity changes (accounts, breaches, identifiers) are high, profile fields are medium, new posts are low.
   */
  significance: Significance;
  /**
   * The connector, site or platform the change came from.
   */
  source: string;
  field?: string | undefined;
  before?: string | undefined;
  after?: string | undefined;
  count?: number | undefined;
  /**
   * The investigation that found the change.
   */
  investigationId: string;
  /**
   * The earlier investigation it was compared with.
   */
  previousInvestigationId: string;
  createdAt: string;
  reviewedAt: string | null;
  reviewedBy?: string | undefined;
};

/** @internal */
export const PersonChange$inboundSchema: z.ZodMiniType<PersonChange, unknown> =
  z.pipe(
    z.object({
      id: types.string(),
      kind: PersonChangeKind$inboundSchema,
      significance: Significance$inboundSchema,
      source: types.string(),
      field: types.optional(types.string()),
      before: types.optional(types.string()),
      after: types.optional(types.string()),
      count: types.optional(types.number()),
      investigation_id: types.string(),
      previous_investigation_id: types.string(),
      created_at: types.string(),
      reviewed_at: types.nullable(types.string()),
      reviewed_by: types.optional(types.string()),
    }),
    z.transform((v) => {
      return remap$(v, {
        "investigation_id": "investigationId",
        "previous_investigation_id": "previousInvestigationId",
        "created_at": "createdAt",
        "reviewed_at": "reviewedAt",
        "reviewed_by": "reviewedBy",
      });
    }),
  );

export function personChangeFromJSON(
  jsonString: string,
): SafeParseResult<PersonChange, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonChange$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonChange' from JSON`,
  );
}
