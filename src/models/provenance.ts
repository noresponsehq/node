import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Customer-submitted input. It does not mean the customer or NoResponse verified ownership.
 */
export const Provenance = {
  Submitted: "submitted",
} as const;
/**
 * Customer-submitted input. It does not mean the customer or NoResponse verified ownership.
 */
export type Provenance = OpenEnum<typeof Provenance>;

/** @internal */
export const Provenance$inboundSchema: z.ZodMiniType<Provenance, unknown> =
  openEnums.inboundSchema(Provenance);
