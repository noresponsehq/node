import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateCustomerExportRequest = {
  /**
   * Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.
   */
  workspaceId: string;
  idempotencyKey?: string | undefined;
  body: models.CustomerExportRequest;
};

export type CreateCustomerExportResponse = {
  headers: { [k: string]: Array<string> };
  result: models.CustomerExport;
};

/** @internal */
export type CreateCustomerExportRequest$Outbound = {
  workspace_id: string;
  "Idempotency-Key"?: string | undefined;
  body: models.CustomerExportRequest$Outbound;
};

/** @internal */
export const CreateCustomerExportRequest$outboundSchema: z.ZodMiniType<
  CreateCustomerExportRequest$Outbound,
  CreateCustomerExportRequest
> = z.pipe(
  z.object({
    workspaceId: z.string(),
    idempotencyKey: z.optional(z.string()),
    body: models.CustomerExportRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      workspaceId: "workspace_id",
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function createCustomerExportRequestToJSON(
  createCustomerExportRequest: CreateCustomerExportRequest,
): string {
  return JSON.stringify(
    CreateCustomerExportRequest$outboundSchema.parse(
      createCustomerExportRequest,
    ),
  );
}

/** @internal */
export const CreateCustomerExportResponse$inboundSchema: z.ZodMiniType<
  CreateCustomerExportResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.CustomerExport$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function createCustomerExportResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateCustomerExportResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateCustomerExportResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateCustomerExportResponse' from JSON`,
  );
}
