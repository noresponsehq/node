import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  Principal,
  Principal$Outbound,
  Principal$outboundSchema,
} from "./principal.js";

/**
 * Creates an event.
 */
export type EventRequest = {
  /**
   * The event's name.
   */
  name: string;
  /**
   * When the event starts.
   */
  startsAt: string;
  /**
   * When the event ends, at or after its start; the start when omitted.
   */
  endsAt?: string | undefined;
  /**
   * Where the event is held.
   */
  venue?: string | undefined;
  /**
   * The organisation hosting the event.
   */
  host?: string | undefined;
  /**
   * The people the event protects, at most 20.
   */
  principals?: Array<Principal> | undefined;
  /**
   * Sensitive topics the screening reads posts against, at most 50.
   */
  topics?: Array<string> | undefined;
};

/** @internal */
export type EventRequest$Outbound = {
  name: string;
  starts_at: string;
  ends_at?: string | undefined;
  venue?: string | undefined;
  host?: string | undefined;
  principals?: Array<Principal$Outbound> | undefined;
  topics?: Array<string> | undefined;
};

/** @internal */
export const EventRequest$outboundSchema: z.ZodMiniType<
  EventRequest$Outbound,
  EventRequest
> = z.pipe(
  z.object({
    name: z.string(),
    startsAt: z.string(),
    endsAt: z.optional(z.string()),
    venue: z.optional(z.string()),
    host: z.optional(z.string()),
    principals: z.optional(z.array(Principal$outboundSchema)),
    topics: z.optional(z.array(z.string())),
  }),
  z.transform((v) => {
    return remap$(v, {
      startsAt: "starts_at",
      endsAt: "ends_at",
    });
  }),
);

export function eventRequestToJSON(eventRequest: EventRequest): string {
  return JSON.stringify(EventRequest$outboundSchema.parse(eventRequest));
}
