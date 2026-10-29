import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type GetPolicyEvaluationRequest = {
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

export type GetPolicyEvaluationResponse = {
  headers: { [k: string]: Array<string> };
  result: models.PolicyEvaluation;
};

/** @internal */
export type GetPolicyEvaluationRequest$Outbound = {
  workspace_id: string;
  environment: string;
  evaluation_id: string;
};

/** @internal */
export const GetPolicyEvaluationRequest$outboundSchema: z.ZodMiniType<
  GetPolicyEvaluationRequest$Outbound,
  GetPolicyEvaluationRequest
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

export function getPolicyEvaluationRequestToJSON(
  getPolicyEvaluationRequest: GetPolicyEvaluationRequest,
): string {
  return JSON.stringify(
    GetPolicyEvaluationRequest$outboundSchema.parse(getPolicyEvaluationRequest),
  );
}

/** @internal */
export const GetPolicyEvaluationResponse$inboundSchema: z.ZodMiniType<
  GetPolicyEvaluationResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.PolicyEvaluation$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function getPolicyEvaluationResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetPolicyEvaluationResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetPolicyEvaluationResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetPolicyEvaluationResponse' from JSON`,
  );
}
