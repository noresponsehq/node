import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type PublishPolicyEvaluationRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  evaluationId: string;
  body: models.PolicyEvaluationPublishRequest;
};

export type PublishPolicyEvaluationResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Settings;
};

/** @internal */
export type PublishPolicyEvaluationRequest$Outbound = {
  workspace_id: string;
  environment: string;
  evaluation_id: string;
  body: models.PolicyEvaluationPublishRequest$Outbound;
};

/** @internal */
export const PublishPolicyEvaluationRequest$outboundSchema: z.ZodMiniType<
  PublishPolicyEvaluationRequest$Outbound,
  PublishPolicyEvaluationRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    evaluationId: z.string(),
    body: models.PolicyEvaluationPublishRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      evaluationId: "evaluation_id",
    });
  }),
);

export function publishPolicyEvaluationRequestToJSON(
  publishPolicyEvaluationRequest: PublishPolicyEvaluationRequest,
): string {
  return JSON.stringify(
    PublishPolicyEvaluationRequest$outboundSchema.parse(
      publishPolicyEvaluationRequest,
    ),
  );
}

/** @internal */
export const PublishPolicyEvaluationResponse$inboundSchema: z.ZodMiniType<
  PublishPolicyEvaluationResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Settings$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function publishPolicyEvaluationResponseFromJSON(
  jsonString: string,
): SafeParseResult<PublishPolicyEvaluationResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PublishPolicyEvaluationResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PublishPolicyEvaluationResponse' from JSON`,
  );
}
