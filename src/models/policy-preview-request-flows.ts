import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  PolicyPreviewRequestFlowsAccountCreation,
  PolicyPreviewRequestFlowsAccountCreation$Outbound,
  PolicyPreviewRequestFlowsAccountCreation$outboundSchema,
} from "./policy-preview-request-flows-account-creation.js";
import {
  PolicyPreviewRequestFlowsLogin,
  PolicyPreviewRequestFlowsLogin$Outbound,
  PolicyPreviewRequestFlowsLogin$outboundSchema,
} from "./policy-preview-request-flows-login.js";
import {
  PolicyPreviewRequestFlowsPurchase,
  PolicyPreviewRequestFlowsPurchase$Outbound,
  PolicyPreviewRequestFlowsPurchase$outboundSchema,
} from "./policy-preview-request-flows-purchase.js";

export type PolicyPreviewRequestFlows = {
  accountCreation?: PolicyPreviewRequestFlowsAccountCreation | undefined;
  login?: PolicyPreviewRequestFlowsLogin | undefined;
  purchase?: PolicyPreviewRequestFlowsPurchase | undefined;
};

/** @internal */
export type PolicyPreviewRequestFlows$Outbound = {
  account_creation?:
    | PolicyPreviewRequestFlowsAccountCreation$Outbound
    | undefined;
  login?: PolicyPreviewRequestFlowsLogin$Outbound | undefined;
  purchase?: PolicyPreviewRequestFlowsPurchase$Outbound | undefined;
};

/** @internal */
export const PolicyPreviewRequestFlows$outboundSchema: z.ZodMiniType<
  PolicyPreviewRequestFlows$Outbound,
  PolicyPreviewRequestFlows
> = z.pipe(
  z.object({
    accountCreation: z.optional(
      PolicyPreviewRequestFlowsAccountCreation$outboundSchema,
    ),
    login: z.optional(PolicyPreviewRequestFlowsLogin$outboundSchema),
    purchase: z.optional(PolicyPreviewRequestFlowsPurchase$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountCreation: "account_creation",
    });
  }),
);

export function policyPreviewRequestFlowsToJSON(
  policyPreviewRequestFlows: PolicyPreviewRequestFlows,
): string {
  return JSON.stringify(
    PolicyPreviewRequestFlows$outboundSchema.parse(policyPreviewRequestFlows),
  );
}
