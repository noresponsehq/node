import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { FlowSettings, FlowSettings$inboundSchema } from "./flow-settings.js";

export type SettingsFlows = {
  /**
   * One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final.
   */
  accountCreation: FlowSettings;
  /**
   * One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final.
   */
  login: FlowSettings;
  /**
   * One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final.
   */
  purchase: FlowSettings;
};

/** @internal */
export const SettingsFlows$inboundSchema: z.ZodMiniType<
  SettingsFlows,
  unknown
> = z.pipe(
  z.object({
    account_creation: FlowSettings$inboundSchema,
    login: FlowSettings$inboundSchema,
    purchase: FlowSettings$inboundSchema,
  }),
  z.transform((v) => {
    return remap$(v, {
      "account_creation": "accountCreation",
    });
  }),
);

export function settingsFlowsFromJSON(
  jsonString: string,
): SafeParseResult<SettingsFlows, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => SettingsFlows$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'SettingsFlows' from JSON`,
  );
}
