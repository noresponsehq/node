import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  InvestigationCompleted,
  InvestigationCompleted$inboundSchema,
  InvestigationCompleted$Outbound,
  InvestigationCompleted$outboundSchema,
} from "./investigation-completed.js";

/**
 * The investigation.completed event.
 */
export type InvestigationCompletedEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always investigation.completed.
   */
  type: "investigation.completed";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  data: InvestigationCompleted;
};

/** @internal */
export const InvestigationCompletedEvent$inboundSchema: z.ZodMiniType<
  InvestigationCompletedEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("investigation.completed"),
    test: types.optional(types.boolean()),
    data: InvestigationCompleted$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type InvestigationCompletedEvent$Outbound = {
  id: string;
  created_at: string;
  type: "investigation.completed";
  test?: boolean | undefined;
  data: InvestigationCompleted$Outbound;
};

/** @internal */
export const InvestigationCompletedEvent$outboundSchema: z.ZodMiniType<
  InvestigationCompletedEvent$Outbound,
  InvestigationCompletedEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("investigation.completed"),
    test: z.optional(z.boolean()),
    data: InvestigationCompleted$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function investigationCompletedEventToJSON(
  investigationCompletedEvent: InvestigationCompletedEvent,
): string {
  return JSON.stringify(
    InvestigationCompletedEvent$outboundSchema.parse(
      investigationCompletedEvent,
    ),
  );
}
export function investigationCompletedEventFromJSON(
  jsonString: string,
): SafeParseResult<InvestigationCompletedEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => InvestigationCompletedEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'InvestigationCompletedEvent' from JSON`,
  );
}
