import * as z from "zod/v4-mini";
import {
  KeyUsageEvent,
  KeyUsageEvent$Outbound,
  KeyUsageEvent$outboundSchema,
} from "./key-usage-event.js";

/**
 * POST /v1/key_usage/batches body: facts about requests made with API keys your platform issued to your accounts, one event per request. Each event names the key by the SHA-256 that the assessment's issued_credential.sha256 carried, not the key itself. The SDKs buffer events and send them in the background. A batch holds 1 to 500 events and at most 256 KiB. Idempotency-Key is required and binds the body as on POST /v1/assessments, so a retried batch is counted once.
 */
export type KeyUsageBatchRequest = {
  events: Array<KeyUsageEvent>;
};

/** @internal */
export type KeyUsageBatchRequest$Outbound = {
  events: Array<KeyUsageEvent$Outbound>;
};

/** @internal */
export const KeyUsageBatchRequest$outboundSchema: z.ZodMiniType<
  KeyUsageBatchRequest$Outbound,
  KeyUsageBatchRequest
> = z.object({
  events: z.array(KeyUsageEvent$outboundSchema),
});

export function keyUsageBatchRequestToJSON(
  keyUsageBatchRequest: KeyUsageBatchRequest,
): string {
  return JSON.stringify(
    KeyUsageBatchRequest$outboundSchema.parse(keyUsageBatchRequest),
  );
}
