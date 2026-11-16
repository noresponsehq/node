import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * queued: the profile is being written. written: summary, statements and leads hold it. failed: it could not be written; error_code says why and no content is returned.
 */
export const WrittenProfileStatus = {
  Queued: "queued",
  Written: "written",
  Failed: "failed",
} as const;
/**
 * queued: the profile is being written. written: summary, statements and leads hold it. failed: it could not be written; error_code says why and no content is returned.
 */
export type WrittenProfileStatus = OpenEnum<typeof WrittenProfileStatus>;

/** @internal */
export const WrittenProfileStatus$inboundSchema: z.ZodMiniType<
  WrittenProfileStatus,
  unknown
> = openEnums.inboundSchema(WrittenProfileStatus);
