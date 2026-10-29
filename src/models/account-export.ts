import * as z from "zod/v4-mini";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import * as openEnums from "../types/enums.js";
import { OpenEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import * as types from "../types/primitives.js";
import {
  AccountBinding,
  AccountBinding$inboundSchema,
} from "./account-binding.js";
import {
  AccountDecisionSnapshot,
  AccountDecisionSnapshot$inboundSchema,
} from "./account-decision-snapshot.js";
import {
  AccountOutcome,
  AccountOutcome$inboundSchema,
} from "./account-outcome.js";
import {
  AssessmentRevision,
  AssessmentRevision$inboundSchema,
} from "./assessment-revision.js";
import {
  CredentialAssociation,
  CredentialAssociation$inboundSchema,
} from "./credential-association.js";
import { Enforcement, Enforcement$inboundSchema } from "./enforcement.js";
import { SDKValidationError } from "./errors/sdk-validation-error.js";
import {
  ExportAssessmentOutcome,
  ExportAssessmentOutcome$inboundSchema,
} from "./export-assessment-outcome.js";
import {
  RequestDiagnostic,
  RequestDiagnostic$inboundSchema,
} from "./request-diagnostic.js";

export const Exclusion = {
  ExpiredOrErasedRecords: "expired_or_erased_records",
  SecretsAndCredentialDigests: "secrets_and_credential_digests",
  PrivateSourceAndWorkPayloads: "private_source_and_work_payloads",
  CrossCustomerData: "cross_customer_data",
  LegacyOutcomeNotes: "legacy_outcome_notes",
  UncapturedHistoricalDecisions: "uncaptured_historical_decisions",
  InvestigatorReviewsRequireReviewExport:
    "investigator_reviews_require_review_export",
} as const;
export type Exclusion = OpenEnum<typeof Exclusion>;

/**
 * Retrieve one consistent snapshot of retained customer-accessible records, including assessment revisions, account decisions, feedback, key associations, enforcements and request diagnostics. Secrets, restricted source information, other customers' data and legacy free-text notes are excluded. The same standard/detailed permissions apply. An export exceeding 10000 records or 8 MiB returns export_too_large without a partial result. Historical decisions that were not captured are identified as an exclusion.
 */
export type AccountExport = {
  /**
   * Version of the body shape.
   */
  schemaVersion: "1";
  /**
   * Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.
   */
  accountId: string;
  exportedAt: string;
  complete: true;
  currentRiskVersion: number;
  assessments: Array<AssessmentRevision>;
  decisions: Array<AccountDecisionSnapshot>;
  outcomes: Array<AccountOutcome>;
  assessmentOutcomes: Array<ExportAssessmentOutcome>;
  credentials: Array<CredentialAssociation>;
  bindings: Array<AccountBinding>;
  enforcements: Array<Enforcement>;
  requests: Array<RequestDiagnostic>;
  exclusions: Array<Exclusion>;
};

/** @internal */
export const Exclusion$inboundSchema: z.ZodMiniType<Exclusion, unknown> =
  openEnums.inboundSchema(Exclusion);

/** @internal */
export const AccountExport$inboundSchema: z.ZodMiniType<
  AccountExport,
  unknown
> = z.pipe(
  z.object({
    schema_version: types.literal("1"),
    account_id: types.string(),
    exported_at: types.string(),
    complete: types.literal(true),
    current_risk_version: types.number(),
    assessments: z.array(AssessmentRevision$inboundSchema),
    decisions: z.array(AccountDecisionSnapshot$inboundSchema),
    outcomes: z.array(AccountOutcome$inboundSchema),
    assessment_outcomes: z.array(ExportAssessmentOutcome$inboundSchema),
    credentials: z.array(CredentialAssociation$inboundSchema),
    bindings: z.array(AccountBinding$inboundSchema),
    enforcements: z.array(Enforcement$inboundSchema),
    requests: z.array(RequestDiagnostic$inboundSchema),
    exclusions: z.array(Exclusion$inboundSchema),
  }),
  z.transform((v) => {
    return remap$(v, {
      "schema_version": "schemaVersion",
      "account_id": "accountId",
      "exported_at": "exportedAt",
      "current_risk_version": "currentRiskVersion",
      "assessment_outcomes": "assessmentOutcomes",
    });
  }),
);

export function accountExportFromJSON(
  jsonString: string,
): SafeParseResult<AccountExport, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AccountExport$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AccountExport' from JSON`,
  );
}
