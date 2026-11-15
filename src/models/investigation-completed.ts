import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  InvestigationCompletedStatus,
  InvestigationCompletedStatus$inboundSchema,
  InvestigationCompletedStatus$outboundSchema,
} from "./investigation-completed-status.js";

export type InvestigationCompleted = {
  investigationId: string;
  personId: string;
  status: InvestigationCompletedStatus;
  errorCode?: string | undefined;
  finishedAt: string;
};

/** @internal */
export const InvestigationCompleted$inboundSchema: z.ZodMiniType<
  InvestigationCompleted,
  unknown
> = z.pipe(
  z.object({
    investigation_id: types.string(),
    person_id: types.string(),
    status: InvestigationCompletedStatus$inboundSchema,
    error_code: types.optional(types.string()),
    finished_at: types.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      "investigation_id": "investigationId",
      "person_id": "personId",
      "error_code": "errorCode",
      "finished_at": "finishedAt",
    });
  }),
);
/** @internal */
export type InvestigationCompleted$Outbound = {
  investigation_id: string;
  person_id: string;
  status: string;
  error_code?: string | undefined;
  finished_at: string;
};

/** @internal */
export const InvestigationCompleted$outboundSchema: z.ZodMiniType<
  InvestigationCompleted$Outbound,
  InvestigationCompleted
> = z.pipe(
  z.object({
    investigationId: z.string(),
    personId: z.string(),
    status: InvestigationCompletedStatus$outboundSchema,
    errorCode: z.optional(z.string()),
    finishedAt: z.string(),
  }),
  z.transform((v) => {
    return remap$(v, {
      investigationId: "investigation_id",
      personId: "person_id",
      errorCode: "error_code",
      finishedAt: "finished_at",
    });
  }),
);

export function investigationCompletedToJSON(
  investigationCompleted: InvestigationCompleted,
): string {
  return JSON.stringify(
    InvestigationCompleted$outboundSchema.parse(investigationCompleted),
  );
}
export function investigationCompletedFromJSON(
  jsonString: string,
): SafeParseResult<InvestigationCompleted, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => InvestigationCompleted$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'InvestigationCompleted' from JSON`,
  );
}
