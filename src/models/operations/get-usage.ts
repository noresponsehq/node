import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetUsageRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The first UTC day, as YYYY-MM-DD.
   */
  from?: string | undefined;
  /**
   * The last UTC day, included, as YYYY-MM-DD; no later than today.
   */
  to?: string | undefined;
};

export type GetUsageResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Usage;
};

/** @internal */
export type GetUsageRequest$Outbound = {
  workspace_id: string;
  from?: string | undefined;
  to?: string | undefined;
};

/** @internal */
export const GetUsageRequest$outboundSchema: z.ZodMiniType<
  GetUsageRequest$Outbound,
  GetUsageRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    from: z.optional(z.string()),
    to: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function getUsageRequestToJSON(
  getUsageRequest: GetUsageRequest,
): string {
  return JSON.stringify(GetUsageRequest$outboundSchema.parse(getUsageRequest));
}

/** @internal */
export const GetUsageResponse$inboundSchema: z.ZodMiniType<
  GetUsageResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Usage$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getUsageResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetUsageResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetUsageResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetUsageResponse' from JSON`,
  );
}
