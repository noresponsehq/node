import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type JudgeWorkspacePersonRecordRequest = {
  personId: string;
  body: models.RecordVerdictRequest;
};

export type JudgeWorkspacePersonRecordResponse = {
  headers: { [k: string]: Array<string> };
  result: models.RecordVerdict;
};

/** @internal */
export type JudgeWorkspacePersonRecordRequest$Outbound = {
  person_id: string;
  body: models.RecordVerdictRequest$Outbound;
};

/** @internal */
export const JudgeWorkspacePersonRecordRequest$outboundSchema: z.ZodMiniType<
  JudgeWorkspacePersonRecordRequest$Outbound,
  JudgeWorkspacePersonRecordRequest
> = z.pipe(
  z.object({
    personId: z.string(),
    body: models.RecordVerdictRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      personId: "person_id",
    });
  }),
);

export function judgeWorkspacePersonRecordRequestToJSON(
  judgeWorkspacePersonRecordRequest: JudgeWorkspacePersonRecordRequest,
): string {
  return JSON.stringify(
    JudgeWorkspacePersonRecordRequest$outboundSchema.parse(
      judgeWorkspacePersonRecordRequest,
    ),
  );
}

/** @internal */
export const JudgeWorkspacePersonRecordResponse$inboundSchema: z.ZodMiniType<
  JudgeWorkspacePersonRecordResponse,
  unknown
> = z.pipe(
  z.object({
    Headers: z._default(z.record(z.string(), z.array(z.string())), {}),
    Result: models.RecordVerdict$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  }),
);

export function judgeWorkspacePersonRecordResponseFromJSON(
  jsonString: string,
): SafeParseResult<JudgeWorkspacePersonRecordResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) =>
      JudgeWorkspacePersonRecordResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'JudgeWorkspacePersonRecordResponse' from JSON`,
  );
}
