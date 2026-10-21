import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 404 answer can carry.
 */
export const NotFoundErrorCode = {
  NotFound: "not_found",
} as const;
/**
 * Machine codes an HTTP 404 answer can carry.
 */
export type NotFoundErrorCode = OpenEnum<typeof NotFoundErrorCode>;

/** @internal */
export const NotFoundErrorCode$inboundSchema: z.ZodMiniType<
  NotFoundErrorCode,
  unknown
> = openEnums.inboundSchema(NotFoundErrorCode);
