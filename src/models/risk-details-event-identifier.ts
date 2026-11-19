import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const RiskDetailsEventIdentifier = {
  Email: "email",
  Username: "username",
} as const;
export type RiskDetailsEventIdentifier = OpenEnum<
  typeof RiskDetailsEventIdentifier
>;

/** @internal */
export const RiskDetailsEventIdentifier$inboundSchema: z.ZodMiniType<
  RiskDetailsEventIdentifier,
  unknown
> = openEnums.inboundSchema(RiskDetailsEventIdentifier);
/** @internal */
export const RiskDetailsEventIdentifier$outboundSchema: z.ZodMiniType<
  string,
  RiskDetailsEventIdentifier
> = openEnums.outboundSchema(RiskDetailsEventIdentifier);
