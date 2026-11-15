import * as z from "zod/v4-mini";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdk-validation-error.js";
import * as models from "../index.js";

export type JudgeRecordRequest = {
  groupId: string;
  personId: string;
  body: models.RecordVerdictRequest;
};

export type JudgeRecordResponse = {
  headers: { [k: string]: Array<string> };
  result: models.RecordVerdict;
};

/** @internal */
export type JudgeRecordRequest$Outbound = {
  group_id: string;
  person_id: string;
  body: models.RecordVerdictRequest$Outbound;
};

/** @internal */
export const JudgeRecordRequest$outboundSchema: z.ZodMiniType<
  JudgeRecordRequest$Outbound,
  JudgeRecordRequest
> = z.pipe(
  z.object({
    groupId: z.string(),
    personId: z.string(),
    body: models.RecordVerdictRequest$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      groupId: "group_id",
      personId: "person_id",
    });
  }),
);

export function judgeRecordRequestToJSON(
  judgeRecordRequest: JudgeRecordRequest,
): string {
  return JSON.stringify(
    JudgeRecordRequest$outboundSchema.parse(judgeRecordRequest),
  );
}

/** @internal */
export const JudgeRecordResponse$inboundSchema: z.ZodMiniType<
  JudgeRecordResponse,
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

export function judgeRecordResponseFromJSON(
  jsonString: string,
): SafeParseResult<JudgeRecordResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => JudgeRecordResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'JudgeRecordResponse' from JSON`,
  );
}
