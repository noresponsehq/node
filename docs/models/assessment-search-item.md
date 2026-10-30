# AssessmentSearchItem

One stored assessment revision, exactly as GET /v1/assessments/{assessment_id}/versions/{version} returns it, with the decision of the assessment's first answer. It is not re-scored and carries no current account risk.

## Example Usage

```typescript
import { AssessmentSearchItem } from "@noresponse/node/models";

let value: AssessmentSearchItem = {
  schemaVersion: "1",
  id: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  status: "partial",
  flow: "account_creation",
  depth: "full",
  detail: {
    schemaVersion: "1",
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    accountId: "acct_7f3a9c",
    identifiers: {
      email: "New.User@Example.com",
      username: "new.user",
      phone: "+61412345678",
      name: "Alex Example",
      ip: "203.0.113.45",
    },
    requestId: "req-2026-10-14-0001",
    status: "pending",
    confidence: "high",
    risk: {
      score: 935384,
      band: "low",
      recommendation: "step_up",
      confidence: "high",
      policyVersion: "risk-2026-10.3",
      policyBasis: "heuristic_unvalidated",
      reasons: [],
      summary: {
        phone: {
          country: "AU",
          carrier: "Telstra",
        },
        ip: {
          country: "AU",
        },
      },
      coverage: {
        answered: 197967,
        failed: 150748,
        pending: 165380,
      },
      details: {
        phoneNames: [
          {
            value: "Alex Example",
            seenBy: 583889,
          },
        ],
        breaches: [
          {
            name: "Example Forum",
            domain: "forum.example.com",
            category: "forum",
            kind: "hacking_forum",
            matchedOn: "email",
          },
        ],
        breachNames: [
          {
            value: "Alex Example",
            seenIn: 714857,
            sites: [
              "forum.example.com",
            ],
          },
        ],
        events: [
          {
            year: 309976,
            kind: "last_active",
            site: "example.com",
            category: "site_breach",
            family: "breach",
            identifier: "email",
          },
        ],
        accounts: [
          {
            name: "Wix",
            domain: "wix.com",
            identifier: "username",
            outcome: "inconclusive",
            firstNamePrefix: "Al",
          },
        ],
      },
    },
    signals: [
      {
        type: "account_presence",
        identifier: "username",
        outcome: "found",
        sourceId: "github",
        evidenceRef: "evr_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
        observedAt: "2026-10-14T09:00:00.210Z",
        lastCheckedAt: "2026-10-14T09:00:00.210Z",
        freshness: "stale",
        enrichment: {
          fields: {
            phone: "+61412345678",
            name: "Alex Example",
            carrier: "Telstra",
            lineType: "mobile",
            entityType: "person",
            countryCode: "61",
            country: "Australia",
            state: "New South Wales",
            city: "Sydney",
            location: "Sydney, New South Wales, Australia",
            nationalFormat: "0412 345 678",
            jobTitle: "Engineer",
            companyName: "Example Pty Ltd",
            email: "new.user@example.com",
            website: "https://example.com",
            firstCallAt: "2026-09-01T00:00:00.000Z",
            lastCallAt: "2026-10-10T00:00:00.000Z",
            matchedName: "Alex Example",
            alternateNames: [
              "Alex E.",
            ],
            nameCandidates: [
              "Alex Example",
            ],
            timezones: [
              "Australia/Sydney",
            ],
            emails: [
              "new.user@example.com",
            ],
            websites: [
              "https://example.com",
            ],
            locations: [
              "Sydney, New South Wales, Australia",
            ],
            socialProfiles: [
              "https://example.com/alexexample",
            ],
          },
        },
      },
    ],
    incompleteSources: [],
    policyVersion: "heuristic-2026-10.1",
    policyBasis: "heuristic_unvalidated",
    assessmentVersion: 144766,
    createdAt: "2026-10-14T09:00:00.000Z",
    updatedAt: "2026-10-14T09:00:00.412Z",
    expiresAt: "2027-10-14T09:00:00.000Z",
    assessmentUrl: "/v1/assessments/asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    timing: {
      deadlineMs: 184776,
      elapsedMs: 637926,
    },
    authContext: {
      provider: "clerk",
      issuer: "https://example-app.clerk.accounts.dev",
      subject: "user_2EXAMPLE",
      sessionId: "sess_2EXAMPLE",
      organizationId: "org_2EXAMPLE",
      verified: false,
      transport: "browser",
    },
  },
  matchedIdentifier: {
    kind: "username",
    value: "JaneDoe",
    matchBasis: "canonical",
    provenance: "submitted",
    namespace: "customer",
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
  matchedIdentifiers: [
    {
      kind: "username",
      value: "JaneDoe",
      matchBasis: "canonical",
      provenance: "submitted",
      namespace: "customer",
      assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      termIndex: 0,
    },
  ],
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                                                                                                                              | Type                                                                                                                                                                                                                                                                                                                                                                                                               | Required                                                                                                                                                                                                                                                                                                                                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                        | Example                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `schemaVersion`                                                                                                                                                                                                                                                                                                                                                                                                    | *"1"*                                                                                                                                                                                                                                                                                                                                                                                                              | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                 | Version of the body shape.                                                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `id`                                                                                                                                                                                                                                                                                                                                                                                                               | *string*                                                                                                                                                                                                                                                                                                                                                                                                           | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                 | This assessment's id, equal to detail.assessment_id.                                                                                                                                                                                                                                                                                                                                                               | asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                                                                                                                                                                                                                                                                     |
| `status`                                                                                                                                                                                                                                                                                                                                                                                                           | [models.Status](../models/status.md)                                                                                                                                                                                                                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                 | Processing state, separate from evidence coverage. complete: final; nothing is still running, but unsupported, failed or unanswered lanes remain in incomplete_sources. partial: a recommendation exists and evidence is incomplete; assessment_url identifies continuing work when present. pending: no recommendation yet; poll or wait for the webhook. Finished processing does not mean all sources answered. |                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `flow`                                                                                                                                                                                                                                                                                                                                                                                                             | [models.Flow](../models/flow.md)                                                                                                                                                                                                                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                 | The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `depth`                                                                                                                                                                                                                                                                                                                                                                                                            | [models.Depth](../models/depth.md)                                                                                                                                                                                                                                                                                                                                                                                 | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                 | How long the synchronous answer waits for sources. quick waits only for the fast sources, those that answer within 500 ms of ingress (or deadline_ms when lower); full waits for the whole budget, up to 3000 ms. Sources still running at the cut continue asynchronously and update the assessment either way.                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `detail`                                                                                                                                                                                                                                                                                                                                                                                                           | [models.AssessmentDetail](../models/assessment-detail.md)                                                                                                                                                                                                                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                 | One assessment's own facts: its score and recommendation, the signals behind them, the lanes still running and its timing. risk here is this assessment's own score; the account's current risk is the account member of the assessment. risk and recommendation are present for complete and partial; assessment_url is present for pending.                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `firstDecision`                                                                                                                                                                                                                                                                                                                                                                                                    | [models.Decision](../models/decision.md)                                                                                                                                                                                                                                                                                                                                                                           | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                                 | An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `matchedIdentifier`                                                                                                                                                                                                                                                                                                                                                                                                | [models.IdentifierMatch](../models/identifier-match.md)                                                                                                                                                                                                                                                                                                                                                            | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                                 | Why this result matched a typed identifier search. value is the original value submitted in assessment_id. Provenance records a customer submission, not a source discovery or verified ownership. Equality is deterministic and has no inferred confidence score. An account result names its newest retained matching assessment, which can differ from latest.                                                  | {<br/>"kind": "username",<br/>"value": "JaneDoe",<br/>"match_basis": "canonical",<br/>"namespace": "customer",<br/>"provenance": "submitted",<br/>"assessment_id": "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM"<br/>}                                                                                                                                                                                                          |
| `matchedIdentifiers`                                                                                                                                                                                                                                                                                                                                                                                               | [models.IdentifierTermMatch](../models/identifier-term-match.md)[]                                                                                                                                                                                                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                                 | Present only for identifier_expression. All satisfied unique terms, ordered by term_index, with original submitted values and retained assessment witnesses. A duplicate normalized term appears once at its first raw leaf index. The legacy single identifier filter instead returns matched_identifier.                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                    |