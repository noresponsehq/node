import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * email matches one address, whatever the case of its local part. email_domain matches every address of the registrable domain and of its subdomains.
 */
export const ListEntryKind = {
  Email: "email",
  EmailDomain: "email_domain",
} as const;
/**
 * email matches one address, whatever the case of its local part. email_domain matches every address of the registrable domain and of its subdomains.
 */
export type ListEntryKind = OpenEnum<typeof ListEntryKind>;

/** @internal */
export const ListEntryKind$inboundSchema: z.ZodMiniType<
  ListEntryKind,
  unknown
> = openEnums.inboundSchema(ListEntryKind);
/** @internal */
export const ListEntryKind$outboundSchema: z.ZodMiniType<
  string,
  ListEntryKind
> = openEnums.outboundSchema(ListEntryKind);
