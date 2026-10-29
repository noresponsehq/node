import * as z from "zod/v4-mini";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ListImpactTransitionFrom,
  ListImpactTransitionFrom$inboundSchema,
} from "./list-impact-transition-from.js";

export type ListImpactTransition = {
  from: ListImpactTransitionFrom;
  to: ListImpactTransitionFrom;
  count: number;
};

/** @internal */
export const ListImpactTransition$inboundSchema: z.ZodMiniType<
  ListImpactTransition,
  unknown
> = z.object({
  from: ListImpactTransitionFrom$inboundSchema,
  to: ListImpactTransitionFrom$inboundSchema,
  count: types.number(),
});

export function listImpactTransitionFromJSON(
  jsonString: string,
): SafeParseResult<ListImpactTransition, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListImpactTransition$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListImpactTransition' from JSON`,
  );
}
