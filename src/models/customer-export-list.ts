import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  CustomerExport,
  CustomerExport$inboundSchema,
} from "./customer-export.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * List exports for one collection.
 */
export type CustomerExportList = {
  items: Array<CustomerExport>;
  nextCursor?: string | undefined;
};

/** @internal */
export const CustomerExportList$inboundSchema: z.ZodMiniType<
  CustomerExportList,
  unknown
> = z.pipe(
  z.object({
    items: z.array(CustomerExport$inboundSchema),
    next_cursor: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "next_cursor": "nextCursor",
    });
  }),
);

export function customerExportListFromJSON(
  jsonString: string,
): SafeParseResult<CustomerExportList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CustomerExportList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CustomerExportList' from JSON`,
  );
}
