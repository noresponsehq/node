import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type StartScreeningRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  /**
   * The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.
   */
  environment: models.KeyEnvironment;
  groupId: string;
  /**
   * Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours.
   */
  idempotencyKey: string;
  body: models.ScreeningRequest;
};

export type StartScreeningResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Screening;
};

/** @internal */
export type StartScreeningRequest$Outbound = {
  workspace_id: string;
  environment: string;
  group_id: string;
  "Idempotency-Key": string;
  body: models.ScreeningRequest$Outbound;
};

/** @internal */
export const StartScreeningRequest$outboundSchema: z.ZodMiniType<
  StartScreeningRequest$Outbound,
  StartScreeningRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    environment: models.KeyEnvironment$outboundSchema,
    groupId: z.string(),
    idempotencyKey: z.string(),
    body: models.ScreeningRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      groupId: "group_id",
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function startScreeningRequestToJSON(
  startScreeningRequest: StartScreeningRequest,
): string {
  return JSON.stringify(
    StartScreeningRequest$outboundSchema.parse(startScreeningRequest),
  );
}

/** @internal */
export const StartScreeningResponse$inboundSchema: z.ZodMiniType<
  StartScreeningResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Screening$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function startScreeningResponseFromJSON(
  jsonString: string,
): SafeParseResult<StartScreeningResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => StartScreeningResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'StartScreeningResponse' from JSON`,
  );
}
