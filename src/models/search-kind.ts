import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The kind of the value searched. A domain search finds the leaked rows of every email address at the domain.
 */
export const SearchKind = {
  Email: "email",
  Phone: "phone",
  Username: "username",
  PersonName: "person_name",
  Password: "password",
  Hash: "hash",
  Ip: "ip",
  Domain: "domain",
} as const;
/**
 * The kind of the value searched. A domain search finds the leaked rows of every email address at the domain.
 */
export type SearchKind = OpenEnum<typeof SearchKind>;

/** @internal */
export const SearchKind$inboundSchema: z.ZodMiniType<SearchKind, unknown> =
  openEnums.inboundSchema(SearchKind);
