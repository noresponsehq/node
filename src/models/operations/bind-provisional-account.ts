import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type BindProvisionalAccountRequest = {
  /**
   * Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.
   */
  assessmentId: string;
  body: models.AccountBindingRequest;
};

export type BindProvisionalAccountResponse = {
  headers: { [k: string]: Array<string> };
  result: models.AccountBinding;
};

/** @internal */
export type BindProvisionalAccountRequest$Outbound = {
  assessment_id: string;
  body: models.AccountBindingRequest$Outbound;
};

/** @internal */
export const BindProvisionalAccountRequest$outboundSchema: z.ZodMiniType<
  BindProvisionalAccountRequest$Outbound,
  BindProvisionalAccountRequest
> = z.pipe(
  z.object({
    assessmentId: z.string(),
    body: models.AccountBindingRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      assessmentId: "assessment_id",
    });
  }),
);

export function bindProvisionalAccountRequestToJSON(
  bindProvisionalAccountRequest: BindProvisionalAccountRequest,
): string {
  return JSON.stringify(
    BindProvisionalAccountRequest$outboundSchema.parse(
      bindProvisionalAccountRequest,
    ),
  );
}

/** @internal */
export const BindProvisionalAccountResponse$inboundSchema: z.ZodMiniType<
  BindProvisionalAccountResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.AccountBinding$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function bindProvisionalAccountResponseFromJSON(
  jsonString: string,
): SafeParseResult<BindProvisionalAccountResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => BindProvisionalAccountResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'BindProvisionalAccountResponse' from JSON`,
  );
}
