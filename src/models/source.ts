import * as z from "zod/v4-mini";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";

export const Source = {
  Requests: "requests",
  WebhookAttempts: "webhook_attempts",
} as const;
export type Source = OpenEnum<typeof Source>;

/** @internal */
export const Source$inboundSchema: z.ZodMiniType<Source, unknown> = openEnums
  .inboundSchema(Source);
