import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AssessmentUpdatedData,
  AssessmentUpdatedData$inboundSchema,
  AssessmentUpdatedData$Outbound,
  AssessmentUpdatedData$outboundSchema,
} from "./assessment-updated-data.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The assessment.updated event.
 */
export type AssessmentUpdatedEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always assessment.updated.
   */
  type: "assessment.updated";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * The assessment, or the minimal notice that it expired.
   */
  data: AssessmentUpdatedData;
};

/** @internal */
export const AssessmentUpdatedEvent$inboundSchema: z.ZodMiniType<
  AssessmentUpdatedEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("assessment.updated"),
    test: types.optional(types.boolean()),
    data: AssessmentUpdatedData$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type AssessmentUpdatedEvent$Outbound = {
  id: string;
  created_at: string;
  type: "assessment.updated";
  test?: boolean | undefined;
  data: AssessmentUpdatedData$Outbound;
};

/** @internal */
export const AssessmentUpdatedEvent$outboundSchema: z.ZodMiniType<
  AssessmentUpdatedEvent$Outbound,
  AssessmentUpdatedEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("assessment.updated"),
    test: z.optional(z.boolean()),
    data: AssessmentUpdatedData$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function assessmentUpdatedEventToJSON(
  assessmentUpdatedEvent: AssessmentUpdatedEvent,
): string {
  return JSON.stringify(
    AssessmentUpdatedEvent$outboundSchema.parse(assessmentUpdatedEvent),
  );
}
export function assessmentUpdatedEventFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentUpdatedEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentUpdatedEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentUpdatedEvent' from JSON`,
  );
}
