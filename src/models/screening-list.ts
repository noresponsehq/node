import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Screening, Screening$inboundSchema } from "./screening.js";

/**
 * Screenings, newest first.
 */
export type ScreeningList = {
  items: Array<Screening>;
  /**
   * Pass as before to read the next, older page.
   */
  nextBefore?: string | undefined;
};

/** @internal */
export const ScreeningList$inboundSchema: z.ZodMiniType<
  ScreeningList,
  unknown
> = z.pipe(
  z.object({
    items: z.array(Screening$inboundSchema),
    next_before: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "next_before": "nextBefore",
    });
  }),
);

export function screeningListFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningList, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningList$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningList' from JSON`,
  );
}
