import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The kind of the value searched.
 */
export const SearchKind = {
  Email: "email",
  Phone: "phone",
  Username: "username",
  PersonName: "person_name",
  Password: "password",
  Hash: "hash",
  Ip: "ip",
} as const;
/**
 * The kind of the value searched.
 */
export type SearchKind = OpenEnum<typeof SearchKind>;

/** @internal */
export const SearchKind$inboundSchema: z.ZodMiniType<SearchKind, unknown> =
  openEnums.inboundSchema(SearchKind);
