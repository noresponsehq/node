import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * record: a record in lookup.records or profiles[].record. post: an item in posts. check: an item in lookup.checks.
 */
export const ProfileCitationKind = {
  Record: "record",
  Post: "post",
  Check: "check",
} as const;
/**
 * record: a record in lookup.records or profiles[].record. post: an item in posts. check: an item in lookup.checks.
 */
export type ProfileCitationKind = OpenEnum<typeof ProfileCitationKind>;

/** @internal */
export const ProfileCitationKind$inboundSchema: z.ZodMiniType<
  ProfileCitationKind,
  unknown
> = openEnums.inboundSchema(ProfileCitationKind);
