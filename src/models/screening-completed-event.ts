import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ScreeningCompleted,
  ScreeningCompleted$inboundSchema,
  ScreeningCompleted$Outbound,
  ScreeningCompleted$outboundSchema,
} from "./screening-completed.js";

/**
 * The screening.completed event.
 */
export type ScreeningCompletedEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always screening.completed.
   */
  type: "screening.completed";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * A screening of a group finished. It counts only the people this screening set out to reach, not who they are: read the roster with GET /v1/workspaces/{workspace_id}/groups/{environment}/{group_id}/people, filtered by band, to act on them. people_screened + partial_coverage = people_total, people_flagged is the sum of by_band, no_footprint counts screened people with no flag whose accounts were not found, and no_profile_to_check those the screening had nothing to look up for on any requested platform. A cancelled screening sends no event.
   */
  data: ScreeningCompleted;
};

/** @internal */
export const ScreeningCompletedEvent$inboundSchema: z.ZodMiniType<
  ScreeningCompletedEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("screening.completed"),
    test: types.optional(types.boolean()),
    data: ScreeningCompleted$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type ScreeningCompletedEvent$Outbound = {
  id: string;
  created_at: string;
  type: "screening.completed";
  test?: boolean | undefined;
  data: ScreeningCompleted$Outbound;
};

/** @internal */
export const ScreeningCompletedEvent$outboundSchema: z.ZodMiniType<
  ScreeningCompletedEvent$Outbound,
  ScreeningCompletedEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("screening.completed"),
    test: z.optional(z.boolean()),
    data: ScreeningCompleted$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function screeningCompletedEventToJSON(
  screeningCompletedEvent: ScreeningCompletedEvent,
): string {
  return JSON.stringify(
    ScreeningCompletedEvent$outboundSchema.parse(screeningCompletedEvent),
  );
}
export function screeningCompletedEventFromJSON(
  jsonString: string,
): SafeParseResult<ScreeningCompletedEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ScreeningCompletedEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ScreeningCompletedEvent' from JSON`,
  );
}
