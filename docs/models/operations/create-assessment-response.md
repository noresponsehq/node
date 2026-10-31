# CreateAssessmentResponse

## Example Usage

```typescript
import { CreateAssessmentResponse } from "@noresponse/node/models/operations";

let value: CreateAssessmentResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
      "example 2",
      "example 3",
    ],
  },
  result: {
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
            code: "voip_number",
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
          accounts: [
            {
              name: "Wix",
              domain: "wix.com",
              identifier: "username",
              outcome: "inconclusive",
              firstNamePrefix: "Al",
            },
          ],
          attributeConflicts: [
            {
              attribute: "gender",
              sites: [
                "forum.example.com",
              ],
            },
          ],
        },
      },
      signals: [
        {
          type: "account_presence",
          identifier: "email",
          outcome: "not_found",
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
      incompleteSources: [],
      policyVersion: "heuristic-2026-10.1",
      policyBasis: "heuristic_unvalidated",
      assessmentVersion: 184776,
      createdAt: "2026-10-14T09:00:00.000Z",
      updatedAt: "2026-10-14T09:00:00.412Z",
      expiresAt: "2027-10-14T09:00:00.000Z",
      assessmentUrl: "/v1/assessments/asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      timing: {
        deadlineMs: 637926,
        elapsedMs: 946880,
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

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `headers`                                       | Record<string, *string*[]>                      | :heavy_check_mark:                              | N/A                                             |
| `result`                                        | [models.Assessment](../../models/assessment.md) | :heavy_check_mark:                              | N/A                                             |