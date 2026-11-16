import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * stated: read from a record. inferred: reasoned from several facts. absence: every source answered and none found it.
 */
export const Basis = {
  Stated: "stated",
  Inferred: "inferred",
  Absence: "absence",
} as const;
/**
 * stated: read from a record. inferred: reasoned from several facts. absence: every source answered and none found it.
 */
export type Basis = OpenEnum<typeof Basis>;

/** @internal */
export const Basis$inboundSchema: z.ZodMiniType<Basis, unknown> = openEnums
  .inboundSchema(Basis);
