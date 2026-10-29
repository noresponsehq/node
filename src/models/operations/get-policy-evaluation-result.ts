import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetPolicyEvaluationResultRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  evaluationId: string;
};

export type GetPolicyEvaluationResultResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PolicyEvaluationResult;
};

/** @internal */
export type GetPolicyEvaluationResultRequest$Outbound = {
  workspace_id: string;
  environment: string;
  evaluation_id: string;
};

/** @internal */
export const GetPolicyEvaluationResultRequest$outboundSchema: z.ZodMiniType<
  GetPolicyEvaluationResultRequest$Outbound,
  GetPolicyEvaluationResultRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    evaluationId: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      evaluationId: "evaluation_id",
    });
  }),
);

export function getPolicyEvaluationResultRequestToJSON(
  getPolicyEvaluationResultRequest: GetPolicyEvaluationResultRequest,
): string {
  return JSON.stringify(
    GetPolicyEvaluationResultRequest$outboundSchema.parse(
      getPolicyEvaluationResultRequest,
    ),
  );
}

/** @internal */
export const GetPolicyEvaluationResultResponse$inboundSchema: z.ZodMiniType<
  GetPolicyEvaluationResultResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.PolicyEvaluationResult$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getPolicyEvaluationResultResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetPolicyEvaluationResultResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetPolicyEvaluationResultResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetPolicyEvaluationResultResponse' from JSON`,
  );
}
