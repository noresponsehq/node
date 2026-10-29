import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type PreviewListRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  body: models.ListPreviewRequest;
};

export type PreviewListResponse = {
  headers: { [k: string]: Array<string> };
  result: models.ListImpact;
};

/** @internal */
export type PreviewListRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.ListPreviewRequest$Outbound;
};

/** @internal */
export const PreviewListRequest$outboundSchema: z.ZodMiniType<
  PreviewListRequest$Outbound,
  PreviewListRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    body: models.ListPreviewRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function previewListRequestToJSON(
  previewListRequest: PreviewListRequest,
): string {
  return JSON.stringify(
    PreviewListRequest$outboundSchema.parse(previewListRequest),
  );
}

/** @internal */
export const PreviewListResponse$inboundSchema: z.ZodMiniType<
  PreviewListResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.ListImpact$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function previewListResponseFromJSON(
  jsonString: string,
): SafeParseResult<PreviewListResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PreviewListResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PreviewListResponse' from JSON`,
  );
}
