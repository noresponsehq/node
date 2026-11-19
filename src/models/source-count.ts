import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

export type SourceCount = {
  asked: number;
  answered: number;
};

/** @internal */
export const SourceCount$inboundSchema: z.ZodMiniType<SourceCount, unknown> = z
  .object({
    asked: types.number(),
    answered: types.number(),
  });

export function sourceCountFromJSON(
  jsonString: string,
): SafeParseResult<SourceCount, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SourceCount$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SourceCount' from JSON`,
  );
}
