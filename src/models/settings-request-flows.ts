import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  FlowChange,
  FlowChange$Outbound,
  FlowChange$outboundSchema,
} from "./flow-change.js";

/**
 * Use account_creation or its deprecated alias signup, not both.
 */
export type SettingsRequestFlows = {
  /**
   * A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.
   */
  accountCreation?: FlowChange | undefined;
  /**
   * A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.
   */
  login?: FlowChange | undefined;
  /**
   * A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.
   */
  purchase?: FlowChange | undefined;
  /**
   * A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.
   */
  signup?: FlowChange | undefined;
};

/** @internal */
export type SettingsRequestFlows$Outbound = {
  account_creation?: FlowChange$Outbound | undefined;
  login?: FlowChange$Outbound | undefined;
  purchase?: FlowChange$Outbound | undefined;
  signup?: FlowChange$Outbound | undefined;
};

/** @internal */
export const SettingsRequestFlows$outboundSchema: z.ZodMiniType<
  SettingsRequestFlows$Outbound,
  SettingsRequestFlows
> = z.pipe(
  z.object({
    accountCreation: z.optional(FlowChange$outboundSchema),
    login: z.optional(FlowChange$outboundSchema),
    purchase: z.optional(FlowChange$outboundSchema),
    signup: z.optional(FlowChange$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountCreation: "account_creation",
    });
  }),
);

export function settingsRequestFlowsToJSON(
  settingsRequestFlows: SettingsRequestFlows,
): string {
  return JSON.stringify(
    SettingsRequestFlows$outboundSchema.parse(settingsRequestFlows),
  );
}
