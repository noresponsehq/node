import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Admission, Admission$inboundSchema } from "./admission.js";
import { DefaultDepth, DefaultDepth$inboundSchema } from "./default-depth.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { OnExpiry, OnExpiry$inboundSchema } from "./on-expiry.js";

/**
 * One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final.
 */
export type FlowSettings = {
  stepUp: number;
  review: number;
  /**
   * The score from which the decision is block. Absent while blocking is off, the default.
   */
  block?: number | undefined;
  /**
   * The depth a request for this flow that names none is served at. Defaults: full for account_creation and purchase, quick for login.
   */
  defaultDepth: DefaultDepth;
  /**
   * true while this flow has no thresholds of its own and uses account_creation's, the default for login and purchase. Always false for signup.
   */
  inheritsAccountCreation: boolean;
  /**
   * immediate (the default): an assessment of this flow is decided from the evidence its answer has, and later evidence may change the decision. held: while the account's current assessment of this flow has not completed, the account's decision for the flow is held, and the final decision arrives as account.risk_changed when the investigation completes or hold_seconds pass, whichever is first. Each flow has its own admission.
   */
  admission: Admission;
  /**
   * How long a held flow's assessment is held after it was created, 30 to 86400 seconds (default 300). Kept while the flow is immediate.
   */
  holdSeconds: number;
  /**
   * The decision a held assessment takes when hold_seconds pass before its investigation completes, unless the evidence so far gives a stricter one (default review). It is announced as account.risk_changed like any other change, so an expired hold is always announced. A hosted provider hook, which cannot wait, answers a held account by it at once: deny for block, allow otherwise. Kept while the flow is immediate.
   */
  onExpiry: OnExpiry;
};

/** @internal */
export const FlowSettings$inboundSchema: z.ZodMiniType<FlowSettings, unknown> =
  z.pipe(
    z.object({
      step_up: types.number(),
      review: types.number(),
      block: types.optional(types.number()),
      default_depth: DefaultDepth$inboundSchema,
      inherits_account_creation: types.boolean(),
      admission: Admission$inboundSchema,
      hold_seconds: types.number(),
      on_expiry: OnExpiry$inboundSchema,
    }),
    z.transform((v) => {
      return remap$(v, {
        "step_up": "stepUp",
        "default_depth": "defaultDepth",
        "inherits_account_creation": "inheritsAccountCreation",
        "hold_seconds": "holdSeconds",
        "on_expiry": "onExpiry",
      });
    }),
  );

export function flowSettingsFromJSON(
  jsonString: string,
): SafeParseResult<FlowSettings, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => FlowSettings$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'FlowSettings' from JSON`,
  );
}
