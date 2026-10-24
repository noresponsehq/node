import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 409 answer can carry.
 */
export const ConflictErrorCode = {
  IdempotencyKeyReused: "idempotency_key_reused",
  KeyRotationInProgress: "key_rotation_in_progress",
  WebhookEndpointLimitReached: "webhook_endpoint_limit_reached",
  WebhookEndpointUnverified: "webhook_endpoint_unverified",
  TooManyIntegrations: "too_many_integrations",
  RiskVersionAhead: "risk_version_ahead",
} as const;
/**
 * Machine codes an HTTP 409 answer can carry.
 */
export type ConflictErrorCode = OpenEnum<typeof ConflictErrorCode>;

/** @internal */
export const ConflictErrorCode$inboundSchema: z.ZodMiniType<
  ConflictErrorCode,
  unknown
> = openEnums.inboundSchema(ConflictErrorCode);
