import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AssessmentDetail,
  AssessmentDetail$inboundSchema,
} from "./assessment-detail.js";
import { Decision, Decision$inboundSchema } from "./decision.js";
import { Depth, Depth$inboundSchema } from "./depth.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Flow, Flow$inboundSchema } from "./flow.js";
import { Status, Status$inboundSchema } from "./status.js";

/**
 * One stored assessment revision, exactly as GET /v1/assessments/{assessment_id}/versions/{version} returns it, with the decision of the assessment's first answer. It is not re-scored and carries no current account risk.
 */
export type AssessmentSearchItem = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  /**
   * This assessment's id, equal to detail.assessment_id.
   */
  id: string;
  /**
   * complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.
   */
  status: Status;
  /**
   * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
   */
  flow: Flow;
  /**
   * How long the synchronous answer waits for sources. quick waits only for the fast sources, those that answer within 500 ms of ingress (or deadline_ms when lower); full waits for the whole budget, up to 3000 ms. Sources still running at the cut continue asynchronously and update the assessment either way.
   */
  depth: Depth;
  /**
   * One assessment's own facts: its score and recommendation, the signals behind them, the lanes still running and its timing. risk here is this assessment's own score; the account's current risk is the account member of the assessment. risk and recommendation are present for complete and partial; assessment_url is present for pending.
   */
  detail: AssessmentDetail;
  /**
   * An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.
   */
  firstDecision?: Decision | undefined;
};

/** @internal */
export const AssessmentSearchItem$inboundSchema: z.ZodMiniType<
  AssessmentSearchItem,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    id: types.string(),
    status: Status$inboundSchema,
    flow: Flow$inboundSchema,
    depth: Depth$inboundSchema,
    detail: AssessmentDetail$inboundSchema,
    first_decision: types.optional(Decision$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "first_decision": "firstDecision",
    });
  }),
);

export function assessmentSearchItemFromJSON(
  jsonString: string,
): SafeParseResult<AssessmentSearchItem, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AssessmentSearchItem$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AssessmentSearchItem' from JSON`,
  );
}
