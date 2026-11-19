import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * account_added and account_removed: an account or profile appeared or disappeared. breach_added and breach_removed: a breach record appeared or disappeared. identifier_added and identifier_removed: an email, phone, username, name or account id on an account the person already held. field_changed: another field on such an account. finding_added: a new finding. posts_added: new posts, counted in count.
 */
export const PersonChangeKind = {
  AccountAdded: "account_added",
  AccountRemoved: "account_removed",
  BreachAdded: "breach_added",
  BreachRemoved: "breach_removed",
  IdentifierAdded: "identifier_added",
  IdentifierRemoved: "identifier_removed",
  FieldChanged: "field_changed",
  FindingAdded: "finding_added",
  PostsAdded: "posts_added",
} as const;
/**
 * account_added and account_removed: an account or profile appeared or disappeared. breach_added and breach_removed: a breach record appeared or disappeared. identifier_added and identifier_removed: an email, phone, username, name or account id on an account the person already held. field_changed: another field on such an account. finding_added: a new finding. posts_added: new posts, counted in count.
 */
export type PersonChangeKind = OpenEnum<typeof PersonChangeKind>;

/** @internal */
export const PersonChangeKind$inboundSchema: z.ZodMiniType<
  PersonChangeKind,
  unknown
> = openEnums.inboundSchema(PersonChangeKind);
