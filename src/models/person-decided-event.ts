import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  PersonDecided,
  PersonDecided$inboundSchema,
  PersonDecided$Outbound,
  PersonDecided$outboundSchema,
} from "./person-decided.js";

/**
 * The person.decided event.
 */
export type PersonDecidedEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always person.decided.
   */
  type: "person.decided";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  /**
   * A reviewer recorded a decision on a person. The decision's note stays in the API. Sent once per recorded review; a person's latest review is its decision, so order by decided_at.
   */
  data: PersonDecided;
};

/** @internal */
export const PersonDecidedEvent$inboundSchema: z.ZodMiniType<
  PersonDecidedEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("person.decided"),
    test: types.optional(types.boolean()),
    data: PersonDecided$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type PersonDecidedEvent$Outbound = {
  id: string;
  created_at: string;
  type: "person.decided";
  test?: boolean | undefined;
  data: PersonDecided$Outbound;
};

/** @internal */
export const PersonDecidedEvent$outboundSchema: z.ZodMiniType<
  PersonDecidedEvent$Outbound,
  PersonDecidedEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("person.decided"),
    test: z.optional(z.boolean()),
    data: PersonDecided$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function personDecidedEventToJSON(
  personDecidedEvent: PersonDecidedEvent,
): string {
  return JSON.stringify(
    PersonDecidedEvent$outboundSchema.parse(personDecidedEvent),
  );
}
export function personDecidedEventFromJSON(
  jsonString: string,
): SafeParseResult<PersonDecidedEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PersonDecidedEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PersonDecidedEvent' from JSON`,
  );
}
