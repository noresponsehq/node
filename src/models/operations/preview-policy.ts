import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type PreviewPolicyRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  body: models.PolicyPreviewRequest;
};

export type PreviewPolicyResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PolicyPreview;
};

/** @internal */
export type PreviewPolicyRequest$Outbound = {
  workspace_id: string;
  environment: string;
  body: models.PolicyPreviewRequest$Outbound;
};

/** @internal */
export const PreviewPolicyRequest$outboundSchema: z.ZodMiniType<
  PreviewPolicyRequest$Outbound,
  PreviewPolicyRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    body: models.PolicyPreviewRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
    });
  }),
);

export function previewPolicyRequestToJSON(
  previewPolicyRequest: PreviewPolicyRequest,
): string {
  return JSON.stringify(
    PreviewPolicyRequest$outboundSchema.parse(previewPolicyRequest),
  );
}

/** @internal */
export const PreviewPolicyResponse$inboundSchema: z.ZodMiniType<
  PreviewPolicyResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.PolicyPreview$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function previewPolicyResponseFromJSON(
  jsonString: string,
): SafeParseResult<PreviewPolicyResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PreviewPolicyResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PreviewPolicyResponse' from JSON`,
  );
}
