import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ListScreeningsRequest = {
  groupId: string;
  /**
   * At most this many items.
   */
  limit?: number | undefined;
  /**
   * Read screenings older than this one.
   */
  before?: string | undefined;
};

export type ListScreeningsResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ScreeningList;
};

/** @internal */
export type ListScreeningsRequest$Outbound = {
  group_id: string;
  limit: number;
  before?: string | undefined;
};

/** @internal */
export const ListScreeningsRequest$outboundSchema: z.ZodMiniType<
  ListScreeningsRequest$Outbound,
  ListScreeningsRequest
> = z.pipe(
  z.object({
    groupId: z.string(),
    limit: z._default(z.int(), 20),
    before: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      groupId: "group_id",
    });
  }),
);

export function listScreeningsRequestToJSON(
  listScreeningsRequest: ListScreeningsRequest,
): string {
  return JSON.stringify(
    ListScreeningsRequest$outboundSchema.parse(listScreeningsRequest),
  );
}

/** @internal */
export const ListScreeningsResponse$inboundSchema: z.ZodMiniType<
  ListScreeningsResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ScreeningList$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function listScreeningsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListScreeningsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListScreeningsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListScreeningsResponse' from JSON`,
  );
}
