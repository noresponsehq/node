import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Required for username: the username submitted by this customer in this workspace/environment. It does not name or join a source platform. Omit for email and phone.
 */
export const Namespace = {
  Customer: "customer",
} as const;
/**
 * Required for username: the username submitted by this customer in this workspace/environment. It does not name or join a source platform. Omit for email and phone.
 */
export type Namespace = OpenEnum<typeof Namespace>;

/** @internal */
export const Namespace$inboundSchema: z.ZodMiniType<Namespace, unknown> =
  openEnums.inboundSchema(Namespace);
/** @internal */
export const Namespace$outboundSchema: z.ZodMiniType<string, Namespace> =
  openEnums.outboundSchema(Namespace);
