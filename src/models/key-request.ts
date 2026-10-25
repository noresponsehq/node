import * as z from "zod/v4-mini";
import { ClosedEnum } from "../types/enums.js";
import {
  KeyEnvironment,
  KeyEnvironment$outboundSchema,
} from "./key-environment.js";

export const KeyRequestScope = {
  Assess: "assess",
  History: "history",
  Delete: "delete",
  Webhooks: "webhooks",
  Detailed: "detailed",
  Integrations: "integrations",
  Management: "management",
} as const;
export type KeyRequestScope = ClosedEnum<typeof KeyRequestScope>;

/**
 * POST /v1/workspaces/{workspace_id}/keys body. Creates an API key in one environment of the workspace with the scopes named, and returns its secret once. A live key needs the admin or owner role; a test key needs developer or above. An API key with the management scope creates keys in its own environment with scopes it holds itself. Each scope may appear once.
 */
export type KeyRequest = {
  /**
   * The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.
   */
  environment: KeyEnvironment;
  /**
   * The key's scopes, each at most once.
   */
  scopes: Array<KeyRequestScope>;
};

/** @internal */
export const KeyRequestScope$outboundSchema: z.ZodMiniEnum<
  typeof KeyRequestScope
> = z.enum(KeyRequestScope);

/** @internal */
export type KeyRequest$Outbound = {
  environment: string;
  scopes: Array<string>;
};

/** @internal */
export const KeyRequest$outboundSchema: z.ZodMiniType<
  KeyRequest$Outbound,
  KeyRequest
> = z.object({
  environment: KeyEnvironment$outboundSchema,
  scopes: z.array(KeyRequestScope$outboundSchema),
});

export function keyRequestToJSON(keyRequest: KeyRequest): string {
  return JSON.stringify(KeyRequest$outboundSchema.parse(keyRequest));
}
