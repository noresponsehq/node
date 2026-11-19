import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Stage, Stage$inboundSchema } from "./stage.js";

export type StageTime = {
  /**
   * ai_typing and analysis appear only on searches recorded before the engine stopped analysing results.
   */
  stage: Stage;
  ms: number;
};

/** @internal */
export const StageTime$inboundSchema: z.ZodMiniType<StageTime, unknown> = z
  .object({
    stage: Stage$inboundSchema,
    ms: types.number(),
  });

export function stageTimeFromJSON(
  jsonString: string,
): SafeParseResult<StageTime, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => StageTime$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'StageTime' from JSON`,
  );
}
