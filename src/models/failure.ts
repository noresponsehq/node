import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Why the attempt failed: the URL is no longer valid, the host did not resolve, it resolved to an address that is not public, no answer within 5 seconds, the connection failed, a 3xx (redirects are not followed) or another non-2xx status. Absent for a delivered attempt.
 */
export const Failure = {
  InvalidUrl: "invalid_url",
  ResolveFailed: "resolve_failed",
  AddressRefused: "address_refused",
  Timeout: "timeout",
  ConnectionFailed: "connection_failed",
  Redirect: "redirect",
  Non2xx: "non_2xx",
} as const;
/**
 * Why the attempt failed: the URL is no longer valid, the host did not resolve, it resolved to an address that is not public, no answer within 5 seconds, the connection failed, a 3xx (redirects are not followed) or another non-2xx status. Absent for a delivered attempt.
 */
export type Failure = OpenEnum<typeof Failure>;

/** @internal */
export const Failure$inboundSchema: z.ZodMiniType<Failure, unknown> = openEnums
  .inboundSchema(Failure);
