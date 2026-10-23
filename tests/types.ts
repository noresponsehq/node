/** Compile-time assertions about the public types (tsc --noEmit via npm test). */
import {
  NoResponse,
  NoResponseError,
  RateLimitError,
  APITimeoutError,
  constructEvent,
  isExpiredEvent,
  fromClerk,
  type Account,
  type AccountDecision,
  type Assessment,
  type AssessmentOutcome,
  type AssessmentPage,
  type AuthContext,
  type Outcome,
  type ResponseMode,
  type Risk,
  type RiskReason,
  type WebhookEvent,
  type WithMeta,
} from "../src/index.js";

declare const rawBody: Uint8Array;
declare const headers: Headers;
const nr = new NoResponse({ apiKey: "k" });

async function surface(): Promise<void> {
  const created: WithMeta<Assessment> = await nr.assessments.create(
    { accountId: "usr_8f2k1", identifiers: { email: "jordan.lee@example.com" } },
    { idempotencyKey: "signup-usr_8f2k1-0001" },
  );
  const requestId: string | null = created.meta.requestId;
  const risk: Risk | undefined = created.risk;
  const reasons: RiskReason[] | undefined = risk?.reasons;
  const polled: Assessment = await nr.assessments.wait(created.assessmentId, { timeoutMs: 5_000, responseMode: "detailed" });
  const page: AssessmentPage = await nr.assessments.query({ accountId: "usr_8f2k1" });
  for await (const item of page) {
    const id: string = item.assessmentId;
    void id;
  }
  const next: AssessmentPage | null = await page.next();
  const account: WithMeta<Account> = await nr.accounts.get("usr_8f2k1");
  const decision: AccountDecision = account.decisionsByFlow.purchase;
  const history: AssessmentPage = await nr.accounts.listAssessments("usr_8f2k1", { limit: 5, responseMode: "standard" });
  // @ts-expect-error deny is not an account decision
  const deny: AccountDecision = "deny";
  void [decision, history, deny];
  const receipt: AssessmentOutcome = await nr.assessments.recordOutcome(created.assessmentId, { outcome: "chargeback" });
  const rotation = await nr.keys.rotate({ overlapSeconds: 3600 });
  const key: string = rotation.key;
  const mode: ResponseMode = "detailed";
  // @ts-expect-error raw is never a response mode
  const raw: ResponseMode = "raw";
  const outcome: Outcome = "chargeback";
  // @ts-expect-error the outcome vocabulary is closed
  const fraud: Outcome = "fraud";
  void [requestId, reasons, polled, next, receipt, key, mode, raw, outcome, fraud];
}

function errors(error: unknown): void {
  if (error instanceof RateLimitError) {
    const retryAfter: number | null = error.retryAfter;
    const status: 429 = error.status;
    void [retryAfter, status];
  }
  if (error instanceof NoResponseError) {
    const status: number = error.status;
    const code: string | null = error.code;
    const requestId: string | null = error.requestId;
    void [status, code, requestId];
  }
  if (error instanceof APITimeoutError) void error.message;
}

function webhooks(): void {
  const event: WebhookEvent = constructEvent(rawBody, headers, { whk_abcdefgh: "secret" });
  if (isExpiredEvent(event)) {
    const version: number = event.data.assessmentVersion;
    void version;
  } else if (event.type === "assessment.updated") {
    const assessment: Assessment = event.data;
    void assessment;
  } else {
    const challenge: string = event.data.challenge;
    void challenge;
  }
  const context: AuthContext = fromClerk({ iss: "https://clerk.example", sub: "user_1" }, { sessionCreatedAt: "2026-10-19T18:00:00Z" });
  void context;
}

void [surface, errors, webhooks];
