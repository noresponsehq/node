import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint.
 */
export const ReasonIdentifier = {
  Email: "email",
  Username: "username",
  Phone: "phone",
  Name: "name",
  Ip: "ip",
  Context: "context",
} as const;
/**
 * The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint.
 */
export type ReasonIdentifier = OpenEnum<typeof ReasonIdentifier>;

/** @internal */
export const ReasonIdentifier$inboundSchema: z.ZodMiniType<
  ReasonIdentifier,
  unknown
> = openEnums.inboundSchema(ReasonIdentifier);
/** @internal */
export const ReasonIdentifier$outboundSchema: z.ZodMiniType<
  string,
  ReasonIdentifier
> = openEnums.outboundSchema(ReasonIdentifier);
