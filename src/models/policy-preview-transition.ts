import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { From, From$inboundSchema } from "./from.js";

export type PolicyPreviewTransition = {
  from: From;
  to: From;
  count: number;
};

/** @internal */
export const PolicyPreviewTransition$inboundSchema: z.ZodMiniType<
  PolicyPreviewTransition,
  unknown
> = z.object({
  from: From$inboundSchema,
  to: From$inboundSchema,
  count: types.number(),
});

export function policyPreviewTransitionFromJSON(
  jsonString: string,
): SafeParseResult<PolicyPreviewTransition, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PolicyPreviewTransition$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PolicyPreviewTransition' from JSON`,
  );
}
