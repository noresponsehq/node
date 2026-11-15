import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Investigation, Investigation$inboundSchema } from "./investigation.js";

/**
 * List investigation history.
 */
export type InvestigationsList = {
  items: Array<Investigation>;
  hasMore: boolean;
  nextCursor: string | null;
};

/** @internal */
export const InvestigationsList$inboundSchema: z.ZodMiniType<
  InvestigationsList,
  unknown
> = z.pipe(
  z.object({
    items: z.array(Investigation$inboundSchema),
    has_more: types.boolean(),
    next_cursor: types.nullable(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "has_more": "hasMore",
      "next_cursor": "nextCursor",
    });
  }),
);

export function investigationsListFromJSON(
  jsonString: string,
): SafeParseResult<InvestigationsList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => InvestigationsList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'InvestigationsList' from JSON`,
  );
}
