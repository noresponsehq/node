# WebhookEvent

The body of every webhook delivery: {id, type, created_at, data}, where type chooses the shape of data. Deliveries are at least once and unordered: deduplicate on id, and keep an assessment only when its detail.assessment_version is newer than the one you hold. GET /v1/assessments/{assessment_id} stays authoritative.


## Supported Types

### `models.AssessmentUpdatedEvent`

```typescript
const value: models.AssessmentUpdatedEvent = {
  id: "evt_01JA2ZB4N5P6Q7R8S9T0VWXYZ1",
  createdAt: "2026-10-14T09:00:02.000Z",
  type: "assessment.updated",
  data: {
    schemaVersion: "1",
    id: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    status: "pending",
    flow: "purchase",
    depth: "quick",
    detail: {
      schemaVersion: "1",
      assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      accountId: "acct_7f3a9c",
      requestId: "req-2026-10-14-0001",
      status: "pending",
      confidence: "high",
      risk: {
        score: 569726,
        band: "critical",
        recommendation: "allow",
        confidence: "medium",
        policyVersion: "risk-2026-10.3",
        policyBasis: "heuristic_unvalidated",
        reasons: [
          {
            code: "breach_name_mismatch",
            weight: 197967,
          },
        ],
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
          answered: 150748,
          failed: 165380,
          pending: 583889,
        },
        details: {
          phoneNames: [
            {
              value: "Alex Example",
              seenBy: 571629,
            },
          ],
          breaches: [
            {
              name: "Example Forum",
              domain: "forum.example.com",
              category: "forum",
              kind: "credential_list",
              matchedOn: "ip",
            },
          ],
          breachNames: [
            {
              value: "Alex Example",
              seenIn: 309976,
            },
          ],
        },
      },
      signals: [
        {
          type: "account_presence",
          identifier: "phone",
          outcome: "inconclusive",
          sourceId: "github",
          evidenceRef: "evr_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
          observedAt: "2026-10-14T09:00:00.210Z",
          lastCheckedAt: "2026-10-14T09:00:00.210Z",
          freshness: "fresh",
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
      incompleteSources: [
        {
          lane: "breach",
          reason: "blocked",
        },
      ],
      policyVersion: "heuristic-2026-10.1",
      policyBasis: "heuristic_unvalidated",
      assessmentVersion: 32467,
      createdAt: "2026-10-14T09:00:00.000Z",
      updatedAt: "2026-10-14T09:00:00.412Z",
      expiresAt: "2027-10-14T09:00:00.000Z",
      assessmentUrl: "/v1/assessments/asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      timing: {
        deadlineMs: 385520,
        elapsedMs: 25209,
      },
      authContext: {
        provider: "clerk",
        issuer: "https://example-app.clerk.accounts.dev",
        subject: "user_2EXAMPLE",
        sessionId: "sess_2EXAMPLE",
        organizationId: "org_2EXAMPLE",
        verified: true,
        transport: "backend",
      },
    },
  },
};
```

### `models.EndpointVerificationEvent`

```typescript
const value: models.EndpointVerificationEvent = {
  id: "evt_01JA2ZB4N5P6Q7R8S9T0VWXYZ1",
  createdAt: "2026-10-14T09:00:02.000Z",
  type: "endpoint.verification",
  data: {
    endpointId: "whe_01JA2Z0A1B2C3D4E5F6G7H8J9K",
    challenge: "q3Jt8mV0x2Yb7Lk9Pz4Rw6Hn1Sd5Fg8Ja0Tc3Ue7Wi4",
  },
};
```

### `models.AccountDeletedEvent`

```typescript
const value: models.AccountDeletedEvent = {
  id: "evt_01JA2ZB4N5P6Q7R8S9T0VWXYZ1",
  createdAt: "2026-10-14T09:00:02.000Z",
  type: "account.deleted",
  data: {
    accountId: "acct_7f3a9c",
    assessmentsDeleted: 534520,
    deletedAt: "2026-10-23T09:00:00.000Z",
  },
};
```

### `models.WorkspaceDeletedEvent`

```typescript
const value: models.WorkspaceDeletedEvent = {
  id: "evt_01JA2ZB4N5P6Q7R8S9T0VWXYZ1",
  createdAt: "2026-10-14T09:00:02.000Z",
  type: "workspace.deleted",
  data: {
    workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    environment: "live",
    deletedAt: "2026-10-23T09:00:00.000Z",
  },
};
```

### `models.WebhookEndpointDisabledEvent`

```typescript
const value: models.WebhookEndpointDisabledEvent = {
  id: "evt_01JA2ZB4N5P6Q7R8S9T0VWXYZ1",
  createdAt: "2026-10-14T09:00:02.000Z",
  type: "webhook_endpoint.disabled",
  data: {
    endpointId: "whe_01JA2Z0A1B2C3D4E5F6G7H8J9K",
    failingSince: "2026-10-20T09:58:31.000Z",
    disabledAt: "2026-10-23T10:00:00.000Z",
  },
};
```

### `models.AccountRiskChangedEvent`

```typescript
const value: models.AccountRiskChangedEvent = {
  id: "evt_01JA2ZB4N5P6Q7R8S9T0VWXYZ1",
  createdAt: "2026-10-14T09:00:02.000Z",
  type: "account.risk_changed",
  data: {
    account: {
      schemaVersion: "1",
      id: "acct_7f3a9c",
      risk: {
        score: 557856,
        decision: "step_up",
        reasons: [
          {
            code: "no_digital_footprint",
            weight: 898586,
          },
        ],
      },
      decisionsByFlow: {
        accountCreation: "review",
        login: "block",
        purchase: "allow",
      },
      assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      updatedAt: "2026-10-14T09:00:00.412Z",
      riskVersion: 960150,
    },
    previousDecisionsByFlow: {
      accountCreation: "review",
      login: "held",
      purchase: "step_up",
    },
  },
};
```

