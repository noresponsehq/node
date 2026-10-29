# Assessment

One assessment, as POST /v1/assessments, GET /v1/assessments/{assessment_id} and the assessment.updated webhook return it. account is the account's one current risk: its score, the decision for this assessment's flow, the reasons and the decision for each flow. detail holds this assessment's own facts. status says whether the assessment is final (complete), usable with a source still running (partial) or not yet usable (pending). While the account's first assessment is pending, account is absent; wait for the webhook or poll the assessment. Keep the highest detail.assessment_version.

## Example Usage

```typescript
import { Assessment } from "@noresponse/node/models";

let value: Assessment = {
  schemaVersion: "1",
  id: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  status: "partial",
  flow: "purchase",
  depth: "quick",
  account: {
    schemaVersion: "1",
    id: "acct_7f3a9c",
    risk: {
      score: 557856,
      decision: "step_up",
      reasons: [
        {
          code: "no_digital_footprint",
          direction: "neutral",
          impact: "medium",
          listEntryId: "lst_01JA2ZE4K5M6N7P8Q9R0S1T2V3",
        },
      ],
    },
    decisionsByFlow: {
      accountCreation: "block",
      login: "allow",
      purchase: "held",
    },
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    updatedAt: "2026-10-14T09:00:00.412Z",
    riskVersion: 698486,
  },
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
      },
    },
    signals: [
      {
        type: "account_presence",
        identifier: "ip",
        outcome: "inconclusive",
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
    assessmentVersion: 385520,
    createdAt: "2026-10-14T09:00:00.000Z",
    updatedAt: "2026-10-14T09:00:00.412Z",
    expiresAt: "2027-10-14T09:00:00.000Z",
    assessmentUrl: "/v1/assessments/asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    timing: {
      deadlineMs: 25209,
      elapsedMs: 144766,
    },
    authContext: {
      provider: "clerk",
      issuer: "https://example-app.clerk.accounts.dev",
      subject: "user_2EXAMPLE",
      sessionId: "sess_2EXAMPLE",
      organizationId: "org_2EXAMPLE",
      verified: true,
      transport: "browser",
    },
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Required                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `schemaVersion`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | *"1"*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Version of the body shape.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `id`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | *string*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | This assessment's id, equal to detail.assessment_id.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `status`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | [models.Status](../models/status.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Processing state, separate from evidence coverage. complete: final; nothing is still running, but unsupported, failed or unanswered lanes remain in incomplete_sources. partial: a recommendation exists and evidence is incomplete; assessment_url identifies continuing work when present. pending: no recommendation yet; poll or wait for the webhook. Finished processing does not mean all sources answered.                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `flow`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | [models.Flow](../models/flow.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `depth`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | [models.Depth](../models/depth.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | How long the synchronous answer waits for sources. quick waits only for the fast sources, those that answer within 500 ms of ingress (or deadline_ms when lower); full waits for the whole budget, up to 3000 ms. Sources still running at the cut continue asynchronously and update the assessment either way.                                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `account`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | [models.Account](../models/account.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling workspace's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment, plus the account's own reason shared_api_key when a key issued to the account was used from many IP addresses or countries (POST /v1/key_usage/batches). Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments). |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `detail`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | [models.AssessmentDetail](../models/assessment-detail.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | One assessment's own facts: its score and recommendation, the signals behind them, the lanes still running and its timing. risk here is this assessment's own score; the account's current risk is the account member of the assessment. risk and recommendation are present for complete and partial; assessment_url is present for pending.                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |