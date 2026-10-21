import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 400 answer can carry.
 */
export const BadRequestErrorCode = {
  InvalidRequest: "invalid_request",
  InvalidIdempotencyKey: "invalid_idempotency_key",
  InvalidCursor: "invalid_cursor",
} as const;
/**
 * Machine codes an HTTP 400 answer can carry.
 */
export type BadRequestErrorCode = OpenEnum<typeof BadRequestErrorCode>;

/** @internal */
export const BadRequestErrorCode$inboundSchema: z.ZodMiniType<
  BadRequestErrorCode,
  unknown
> = openEnums.inboundSchema(BadRequestErrorCode);
