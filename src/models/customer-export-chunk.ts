import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * Download one authorized export chunk.
 */
export type CustomerExportChunk = {
  exportId: string;
  index: number;
  generation: number;
  sha256: string;
  /**
   * Base64-encoded UTF-8 JSON Lines, at most 256 KiB decoded. Each line is a typed customer export record. Decode and concatenate chunks in index order within the same generation.
   */
  data: string;
  nextChunk?: number | undefined;
};

/** @internal */
export const CustomerExportChunk$inboundSchema: z.ZodMiniType<
  CustomerExportChunk,
  unknown
> = z.pipe(
  z.object({
    export_id: types.string(),
    index: types.number(),
    generation: types.number(),
    sha256: types.string(),
    data: types.string(),
    next_chunk: types.optional(types.number()),
  }),
  z.transform((v) => {
    return remap$(v, {
      "export_id": "exportId",
      "next_chunk": "nextChunk",
    });
  }),
);

export function customerExportChunkFromJSON(
  jsonString: string,
): SafeParseResult<CustomerExportChunk, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CustomerExportChunk$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CustomerExportChunk' from JSON`,
  );
}
