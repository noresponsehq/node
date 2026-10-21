import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { Platform, Platform$outboundSchema } from "./platform.js";

/**
 * Optional context observed by your signup client. The server parses these hints into coarse features, leaves raw user_agent and opaque ids out of every answer, and weighs a mismatch with the other evidence.
 */
export type AssessmentRequestClientContext = {
  /**
   * IANA time-zone name such as Europe/London or America/Los_Angeles. Fixed numeric offsets are not accepted.
   */
  timezone?: string | undefined;
  /**
   * BCP 47 locale, for example en-AU. Treat as a presentation hint, not a nationality signal.
   */
  locale?: string | undefined;
  /**
   * Client platform. Closed vocabulary keeps integrations stable.
   */
  platform?: Platform | undefined;
  /**
   * Customer application version, without build metadata that contains secrets.
   */
  appVersion?: string | undefined;
  /**
   * The raw User-Agent header of the signup request, at most 512 characters. It is parsed into coarse features and left out of every answer.
   */
  userAgent?: string | undefined;
  /**
   * Tenant-scoped opaque identifier your application mints and rotates when the account or device changes. Send an id of your own, not a hardware fingerprint.
   */
  deviceId?: string | undefined;
  /**
   * Opaque signup session identifier. It is used for tenant-scoped velocity and replay checks only.
   */
  sessionId?: string | undefined;
  /**
   * Elapsed time from form start to submit. Values below three seconds are a weak automation hint, weighed with the other evidence.
   */
  formDurationMs?: number | undefined;
  /**
   * RFC 3339 timestamp observed by the client. Server ingress time remains authoritative; a large clock skew is only a low-confidence feature.
   */
  clientObservedAt?: string | undefined;
};

/** @internal */
export type AssessmentRequestClientContext$Outbound = {
  timezone?: string | undefined;
  locale?: string | undefined;
  platform?: string | undefined;
  app_version?: string | undefined;
  user_agent?: string | undefined;
  device_id?: string | undefined;
  session_id?: string | undefined;
  form_duration_ms?: number | undefined;
  client_observed_at?: string | undefined;
};

/** @internal */
export const AssessmentRequestClientContext$outboundSchema: z.ZodMiniType<
  AssessmentRequestClientContext$Outbound,
  AssessmentRequestClientContext
> = z.pipe(
  z.object({
    timezone: z.optional(z.string()),
    locale: z.optional(z.string()),
    platform: z.optional(Platform$outboundSchema),
    appVersion: z.optional(z.string()),
    userAgent: z.optional(z.string()),
    deviceId: z.optional(z.string()),
    sessionId: z.optional(z.string()),
    formDurationMs: z.optional(z.int()),
    clientObservedAt: z.optional(z.string()),
  }),
  z.transform((v) => {
    return remap$(v, {
      appVersion: "app_version",
      userAgent: "user_agent",
      deviceId: "device_id",
      sessionId: "session_id",
      formDurationMs: "form_duration_ms",
      clientObservedAt: "client_observed_at",
    });
  }),
);

export function assessmentRequestClientContextToJSON(
  assessmentRequestClientContext: AssessmentRequestClientContext,
): string {
  return JSON.stringify(
    AssessmentRequestClientContext$outboundSchema.parse(
      assessmentRequestClientContext,
    ),
  );
}
