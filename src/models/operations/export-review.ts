import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type ExportReviewRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  reviewId: string;
};

export type ExportReviewResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Export;
};

/** @internal */
export type ExportReviewRequest$Outbound = {
  workspace_id: string;
  environment: string;
  review_id: string;
};

/** @internal */
export const ExportReviewRequest$outboundSchema: z.ZodMiniType<
  ExportReviewRequest$Outbound,
  ExportReviewRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    reviewId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      reviewId: "review_id",
    });
  }),
);

export function exportReviewRequestToJSON(
  exportReviewRequest: ExportReviewRequest,
): string {
  return JSON.stringify(
    ExportReviewRequest$outboundSchema.parse(exportReviewRequest),
  );
}

/** @internal */
export const ExportReviewResponse$inboundSchema: z.ZodMiniType<
  ExportReviewResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Export$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function exportReviewResponseFromJSON(
  jsonString: string,
): SafeParseResult<ExportReviewResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ExportReviewResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ExportReviewResponse' from JSON`,
  );
}
