import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import {
  AnswerRevision,
  AnswerRevision$outboundSchema,
} from "./answer-revision.js";
import { Band, Band$outboundSchema } from "./band.js";
import { Decision, Decision$outboundSchema } from "./decision.js";
import { Flow, Flow$outboundSchema } from "./flow.js";
import { Impact, Impact$outboundSchema } from "./impact.js";
import { Lane, Lane$outboundSchema } from "./lane.js";
import { ListMatch, ListMatch$outboundSchema } from "./list-match.js";
import { ReasonCode, ReasonCode$outboundSchema } from "./reason-code.js";
import {
  Recommendation,
  Recommendation$outboundSchema,
} from "./recommendation.js";
import { ResponseMode, ResponseMode$outboundSchema } from "./response-mode.js";
import { Status, Status$outboundSchema } from "./status.js";

/**
 * Search retained assessments created in [from,to), over at most 366 days. Filters use each assessment decision, rather than the current account decision. Results can change between pages. Keep the assessment version to retrieve the exact decision later. This read does not require an idempotency key.
 */
export type AssessmentSearchRequest = {
  from: string;
  to: string;
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId?: string | undefined;
  /**
   * The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.
   */
  flow?: Flow | undefined;
  /**
   * complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.
   */
  status?: Status | undefined;
  /**
   * The recommended action: allow, step_up or review. Your application applies it.
   */
  recommendation?: Recommendation | undefined;
  limit?: number | undefined;
  /**
   * Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged.
   */
  cursor?: string | undefined;
  /**
   * standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.
   */
  responseMode?: ResponseMode | undefined;
  /**
   * An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.
   */
  decision?: Decision | undefined;
  /**
   * Which answer of each assessment the filters describe: latest, the latest stored revision, or first, the first answer, as served when the assessment was first answered (POST /v1/assessments/aggregate counts first answers). A cell of an aggregate drills down to POST /v1/assessments/search with the same filters, revision first and the cell's bucket as from and to.
   */
  revision?: AnswerRevision | undefined;
  band?: Band | undefined;
  /**
   * A stable reason code. New codes may appear; ignore any you do not know.
   */
  reason?: ReasonCode | undefined;
  /**
   * The selected reason's served impact band. Requires reason.
   */
  impact?: Impact | undefined;
  /**
   * An evidence lane: accounts (account presence for email and username), phone, breach, domain (the email domain's registration) and ip.
   */
  lane?: Lane | undefined;
  country?: string | undefined;
  asn?: number | undefined;
  /**
   * Inclusive lower score bound. Pending answers without a score do not match.
   */
  scoreMin?: number | undefined;
  /**
   * Inclusive upper score bound, at least score_min when both are supplied.
   */
  scoreMax?: number | undefined;
  /**
   * The list action captured at the first answer. Requires revision first. Older answers without captured list state do not match, including none.
   */
  listMatch?: ListMatch | undefined;
};

/** @internal */
export type AssessmentSearchRequest$Outbound = {
  from: string;
  to: string;
  account_id?: string | undefined;
  flow?: string | undefined;
  status?: string | undefined;
  recommendation?: string | undefined;
  limit: number;
  cursor?: string | undefined;
  response_mode?: string | undefined;
  decision?: string | undefined;
  revision?: string | undefined;
  band?: string | undefined;
  reason?: string | undefined;
  impact?: string | undefined;
  lane?: string | undefined;
  country?: string | undefined;
  asn?: number | undefined;
  score_min?: number | undefined;
  score_max?: number | undefined;
  list_match?: string | undefined;
};

/** @internal */
export const AssessmentSearchRequest$outboundSchema: z.ZodMiniType<
  AssessmentSearchRequest$Outbound,
  AssessmentSearchRequest
> = z.pipe(
  z.object({
    from: z.string(),
    to: z.string(),
    accountId: z.optional(z.string()),
    flow: z.optional(Flow$outboundSchema),
    status: z.optional(Status$outboundSchema),
    recommendation: z.optional(Recommendation$outboundSchema),
    limit: z._default(z.int(), 20),
    cursor: z.optional(z.string()),
    responseMode: z.optional(ResponseMode$outboundSchema),
    decision: z.optional(Decision$outboundSchema),
    revision: z.optional(AnswerRevision$outboundSchema),
    band: z.optional(Band$outboundSchema),
    reason: z.optional(ReasonCode$outboundSchema),
    impact: z.optional(Impact$outboundSchema),
    lane: z.optional(Lane$outboundSchema),
    country: z.optional(z.string()),
    asn: z.optional(z.int()),
    scoreMin: z.optional(z.int()),
    scoreMax: z.optional(z.int()),
    listMatch: z.optional(ListMatch$outboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      accountId: "account_id",
      responseMode: "response_mode",
      scoreMin: "score_min",
      scoreMax: "score_max",
      listMatch: "list_match",
    });
  }),
);

export function assessmentSearchRequestToJSON(
  assessmentSearchRequest: AssessmentSearchRequest,
): string {
  return JSON.stringify(
    AssessmentSearchRequest$outboundSchema.parse(assessmentSearchRequest),
  );
}
