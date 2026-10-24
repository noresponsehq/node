import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  EndpointVerification,
  EndpointVerification$inboundSchema,
  EndpointVerification$Outbound,
  EndpointVerification$outboundSchema,
} from "./endpoint-verification.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";

/**
 * The endpoint.verification event.
 */
export type EndpointVerificationEvent = {
  /**
   * The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.
   */
  id: string;
  /**
   * When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.
   */
  createdAt: string;
  /**
   * Always endpoint.verification.
   */
  type: "endpoint.verification";
  /**
   * Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.
   */
  test?: boolean | undefined;
  data: EndpointVerification;
};

/** @internal */
export const EndpointVerificationEvent$inboundSchema: z.ZodMiniType<
  EndpointVerificationEvent,
  unknown
> = z.pipe(
  z.object({
    id: types.string(),
    created_at: types.string(),
    type: types.literal("endpoint.verification"),
    test: types.optional(types.boolean()),
    data: EndpointVerification$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "created_at": "createdAt",
    });
  }),
);
/** @internal */
export type EndpointVerificationEvent$Outbound = {
  id: string;
  created_at: string;
  type: "endpoint.verification";
  test?: boolean | undefined;
  data: EndpointVerification$Outbound;
};

/** @internal */
export const EndpointVerificationEvent$outboundSchema: z.ZodMiniType<
  EndpointVerificationEvent$Outbound,
  EndpointVerificationEvent
> = z.pipe(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    type: z.literal("endpoint.verification"),
    test: z.optional(z.boolean()),
    data: EndpointVerification$outboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      createdAt: "created_at",
    });
  }),
);

export function endpointVerificationEventToJSON(
  endpointVerificationEvent: EndpointVerificationEvent,
): string {
  return JSON.stringify(
    EndpointVerificationEvent$outboundSchema.parse(endpointVerificationEvent),
  );
}
export function endpointVerificationEventFromJSON(
  jsonString: string,
): SafeParseResult<EndpointVerificationEvent, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => EndpointVerificationEvent$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'EndpointVerificationEvent' from JSON`,
  );
}
