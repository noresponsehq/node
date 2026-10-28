import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  RequestDiagnostic,
  RequestDiagnostic$inboundSchema,
} from "./request-diagnostic.js";

/**
 * Authenticated attempts in a bounded interval, newest first. Keep the same filters when paging.
 */
export type RequestDiagnosticPage = {
  items: Array<RequestDiagnostic>;
  nextCursor?: string | undefined;
};

/** @internal */
export const RequestDiagnosticPage$inboundSchema: z.ZodMiniType<
  RequestDiagnosticPage,
  unknown
> = z.pipe(
  z.object({
    items: z.array(RequestDiagnostic$inboundSchema),
    next_cursor: types.optional(types.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "next_cursor": "nextCursor",
    });
  }),
);

export function requestDiagnosticPageFromJSON(
  jsonString: string,
): SafeParseResult<RequestDiagnosticPage, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => RequestDiagnosticPage$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'RequestDiagnosticPage' from JSON`,
  );
}
