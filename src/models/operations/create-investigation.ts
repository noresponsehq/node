import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type CreateInvestigationRequest = {
  /**
   * Opaque request key, 16 to 128 characters. Repeating the key and request returns the same resource in its current state while it is retained. A different request with the same key answers 409. Use a new key for a deliberate new operation. Keys are scoped to the environment and operation; person searches also scope them to the group and person.
   */
  idempotencyKey: string;
  body: models.InvestigationRequest;
};

export type CreateInvestigationResponse = {
  headers: { [k: string]: Array<string> };
  result: models.Investigation;
};

/** @internal */
export type CreateInvestigationRequest$Outbound = {
  "Idempotency-Key": string;
  body: models.InvestigationRequest$Outbound;
};

/** @internal */
export const CreateInvestigationRequest$outboundSchema: z.ZodMiniType<
  CreateInvestigationRequest$Outbound,
  CreateInvestigationRequest
> = z.pipe(
  z.object({
    idempotencyKey: z.string(),
    body: models.InvestigationRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      idempotencyKey: "Idempotency-Key",
    });
  }),
);

export function createInvestigationRequestToJSON(
  createInvestigationRequest: CreateInvestigationRequest,
): string {
  return JSON.stringify(
    CreateInvestigationRequest$outboundSchema.parse(createInvestigationRequest),
  );
}

/** @internal */
export const CreateInvestigationResponse$inboundSchema: z.ZodMiniType<
  CreateInvestigationResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.Investigation$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function createInvestigationResponseFromJSON(
  jsonString: string,
): SafeParseResult<CreateInvestigationResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => CreateInvestigationResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'CreateInvestigationResponse' from JSON`,
  );
}
