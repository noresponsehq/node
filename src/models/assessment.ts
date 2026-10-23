import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import { Account, Account$inboundSchema } from "./account.js";
import {
  AssessmentDetail,
  AssessmentDetail$inboundSchema,
} from "./assessment-detail.js";
import { Depth, Depth$inboundSchema } from "./depth.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import { Flow, Flow$inboundSchema } from "./flow.js";
import { Status, Status$inboundSchema } from "./status.js";

/**
 * One assessment, as POST /v1/assessments, GET /v1/assessments/{assessment_id} and the assessment.updated webhook return it. account is the account's one current risk: its score, the decision for this assessment's flow, the reasons and the decision for each flow. detail holds this assessment's own facts. status says whether the assessment is final (complete), usable with a source still running (partial) or not yet usable (pending). While the account's first assessment is pending, account is absent; wait for the webhook or poll the assessment. Keep the highest detail.assessment_version.
 */
export type Assessment = {
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
   * The customer event an assessment is made for: signup (a new account), login (a returning sign-in) or purchase (a payment or credit grant). The account's risk is reported with the decision for this flow.
   */
  flow: Flow;
  /**
   * How long the synchronous answer waits for sources. quick waits only for the fast sources, those that answer within 500 ms of ingress (or deadline_ms when lower); full waits for the whole budget, up to 3000 ms. Sources still running at the cut continue asynchronously and update the assessment either way.
   */
  depth: Depth;
  /**
   * Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling tenant's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment. Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments).
   */
  account?: Account | undefined;
  /**
   * One assessment's own facts: its score and recommendation, the signals behind them, the lanes still running and its timing. risk here is this assessment's own score; the account's current risk is the account member of the assessment. risk and recommendation are present for complete and partial; assessment_url is present for pending.
   */
  detail: AssessmentDetail;
};

/** @internal */
export const Assessment$inboundSchema: z.ZodMiniType<Assessment, unknown> = z
  .pipe(
    z.object({
      schema_version: types.literal("1"),
      id: types.string(),
      status: Status$inboundSchema,
      flow: Flow$inboundSchema,
      depth: Depth$inboundSchema,
      account: types.optional(Account$inboundSchema),
      detail: AssessmentDetail$inboundSchema,
    }),
    z.transform((v) => {
      return remap$(v, {
        "schema_version": "schemaVersion",
      });
    }),
  );

export function assessmentFromJSON(
  jsonString: string,
): SafeParseResult<Assessment, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Assessment$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Assessment' from JSON`,
  );
}
