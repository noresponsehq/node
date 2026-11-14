import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PersonFlagged,
  PersonFlagged$inboundSchema,
  PersonFlagged$Outbound,
  PersonFlagged$outboundSchema,
} from "./person-flagged.js";

/**
 * The person.flagged event.
 */
export type PersonFlaggedEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always person.flagged.
   */
  type: "person.flagged";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * A screening recorded a finding on a person. It says which person and how severe, not what they posted, who they are or why: GET the person report for the findings. Sent once per screening that flags the person, so a re-screen of someone on watch announces them again.
   */
  data: PersonFlagged;
};

/** @internal */
export const PersonFlaggedEvent$inboundSchema: z.ZodMiniType<
  PersonFlaggedEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("person.flagged"),
    test: types.optional(types.boolean()),
    data: PersonFlagged$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type PersonFlaggedEvent$Outbound = {
  id: string;
  created_at: string;
  type: "person.flagged";
  test?: boolean | undefined;
  data: PersonFlagged$Outbound;
};

/** @internal */
export const PersonFlaggedEvent$outboundSchema: z.ZodMiniType<
  PersonFlaggedEvent$Outbound,
  PersonFlaggedEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("person.flagged"),
    test: z.optional(z.boolean()),
    data: PersonFlagged$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function personFlaggedEventToJSON(
  personFlaggedEvent: PersonFlaggedEvent,
): string {
  return JSON.stringify(
    PersonFlaggedEvent$outboundSchema.parse(personFlaggedEvent),
  );
}
export function personFlaggedEventFromJSON(
  jsonString: string,
): SafeParseResult<PersonFlaggedEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonFlaggedEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonFlaggedEvent' from JSON`,
  );
}
