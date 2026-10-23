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
  type AccountDeletion,
  type AssessmentDeletion,
  type Assessment,
  type AssessmentDetail,
  type AssessmentOutcome,
  type KeyUsageBatch,
  type KeyUsageBuffer,
  type KeyUsageStats,
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
    { accountId: "usr_8f2k1", flow: "account_creation", identifiers: { email: "jordan.lee@example.com" } },
    { idempotencyKey: "account-usr_8f2k1-0001" },
  );
  const requestId: string | null = created.meta.requestId;
  const current: AccountDecision | undefined = created.account?.risk.decision;
  const risk: Risk | undefined = created.detail.risk;
  const reasons: RiskReason[] | undefined = risk?.reasons;
  const version: number = created.detail.assessmentVersion;
  // @ts-expect-error flow is required
  await nr.assessments.create({ accountId: "usr_8f2k1", identifiers: { email: "jordan.lee@example.com" } });
  const polled: Assessment = await nr.assessments.wait(created.id, { timeoutMs: 5_000, responseMode: "detailed" });
  const page: AssessmentPage = await nr.assessments.query({ accountId: "usr_8f2k1" });
  for await (const item of page) {
    const detail: AssessmentDetail = item;
    const id: string = item.assessmentId;
    void [detail, id];
  }
  const next: AssessmentPage | null = await page.next();
  const account: WithMeta<Account> = await nr.accounts.get("usr_8f2k1");
  const decision: AccountDecision = account.decisionsByFlow.purchase;
  const history: AssessmentPage = await nr.accounts.listAssessments("usr_8f2k1", { limit: 5, responseMode: "standard" });
  const erased: WithMeta<AccountDeletion> = await nr.accounts.delete("usr_8f2k1");
  const erasedCount: number = erased.assessmentsDeleted;
  const removed: WithMeta<AssessmentDeletion> = await nr.assessments.delete("asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM");
  const nextCurrent: string | undefined = removed.account.currentAssessmentId;
  void nextCurrent;
  void erasedCount;
  // @ts-expect-error deny is not an account decision
  const deny: AccountDecision = "deny";
  void [decision, history, deny];
  const receipt: AssessmentOutcome = await nr.assessments.recordOutcome(created.id, { outcome: "chargeback" });
  const batch: WithMeta<KeyUsageBatch> = await nr.keyUsage.record({ events: [{ keySha256: "0".repeat(64), ip: "203.0.113.24", occurredAt: "2026-10-23T09:14:07Z" }] });
  const usage: KeyUsageBuffer = nr.keyUsage.buffer({ batchSize: 200, sampleRate: 0.5 });
  usage.record({ key: "issued-key", ip: "203.0.113.24", model: "gpt-4o-mini", inputTokens: 10 });
  // @ts-expect-error ip is required
  usage.record({ keySha256: "0".repeat(64) });
  const usageStats: KeyUsageStats = usage.stats();
  await usage.close();
  void [batch, usageStats];
  const rotation = await nr.keys.rotate({ overlapSeconds: 3600 });
  const key: string = rotation.key;
  const mode: ResponseMode = "detailed";
  // @ts-expect-error raw is never a response mode
  const raw: ResponseMode = "raw";
  const outcome: Outcome = "chargeback";
  // @ts-expect-error the outcome vocabulary is closed
  const fraud: Outcome = "fraud";
  void [requestId, current, reasons, version, polled, next, receipt, key, mode, raw, outcome, fraud];
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
    const version: number = assessment.detail.assessmentVersion;
    void [assessment, version];
  } else if (event.type === "account.deleted") {
    const erased: number = event.data.assessmentsDeleted;
    void erased;
  } else if (event.type === "workspace.deleted") {
    const environment: "live" | "test" = event.data.environment;
    void environment;
  } else if (event.type === "webhook_endpoint.disabled") {
    const failingSince: string = event.data.failingSince;
    void failingSince;
  } else if (event.type === "account.risk_changed") {
    const account: Account = event.data.account;
    const previous: AccountDecision = event.data.previousDecisionsByFlow.accountCreation;
    void [account, previous];
  } else {
    const challenge: string = event.data.challenge;
    void challenge;
  }
  const context: AuthContext = fromClerk({ iss: "https://clerk.example", sub: "user_1" }, { sessionCreatedAt: "2026-10-19T18:00:00Z" });
  void context;
}

void [surface, errors, webhooks];
