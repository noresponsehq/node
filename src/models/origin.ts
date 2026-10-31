import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";

/**
 * api (the default) searches the assessments your integration sent. lookup searches the assessments your team ran by hand on the console's Lookup page. The API sets an assessment's origin from the credential that sent it. A lookup is not in any other list, count, webhook event or account.
 */
export const Origin = {
  Api: "api",
  Lookup: "lookup",
} as const;
/**
 * api (the default) searches the assessments your integration sent. lookup searches the assessments your team ran by hand on the console's Lookup page. The API sets an assessment's origin from the credential that sent it. A lookup is not in any other list, count, webhook event or account.
 */
export type Origin = ClosedEnum<typeof Origin>;

/** @internal */
export const Origin$outboundSchema: z.ZodMiniEnum<typeof Origin> = z.enum(
  Origin,
);
