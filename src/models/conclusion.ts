import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Conclusion = {
  Benign: "benign",
  Abuse: "abuse",
  Inconclusive: "inconclusive",
} as const;
export type Conclusion = OpenEnum<typeof Conclusion>;

/** @internal */
export const Conclusion$inboundSchema: z.ZodMiniType<Conclusion, unknown> =
  openEnums.inboundSchema(Conclusion);
/** @internal */
export const Conclusion$outboundSchema: z.ZodMiniType<string, Conclusion> =
  openEnums.outboundSchema(Conclusion);
