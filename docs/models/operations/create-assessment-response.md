# CreateAssessmentResponse

## Example Usage

```typescript
import { CreateAssessmentResponse } from "@noresponse/node/models/operations";

let value: CreateAssessmentResponse = {
  headers: {},
  result: {
    schemaVersion: "1",
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    accountId: "acct_7f3a9c",
    requestId: "req-2026-10-14-0001",
    status: "partial",
    confidence: "unavailable",
    risk: {
      score: 419761,
      band: "high",
      recommendation: "allow",
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
        answered: 898586,
        failed: 516216,
        pending: 674465,
      },
      details: {
        phoneNames: [
          {
            value: "Alex Example",
            seenBy: 176739,
          },
        ],
        breaches: [
          {
            name: "Example Forum",
            domain: "forum.example.com",
            category: "forum",
            kind: "darkweb_site",
            matchedOn: "ip",
          },
        ],
        breachNames: [
          {
            value: "Alex Example",
            seenIn: 749093,
          },
        ],
      },
    },
    signals: [
      {
        type: "account_presence",
        identifier: "phone",
        outcome: "unavailable",
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
    assessmentVersion: 679809,
    createdAt: "2026-10-14T09:00:00.000Z",
    updatedAt: "2026-10-14T09:00:00.412Z",
    expiresAt: "2027-10-14T09:00:00.000Z",
    assessmentUrl: "/v1/assessments/asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    timing: {
      deadlineMs: 443549,
      elapsedMs: 197967,
    },
  },
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `headers`                                       | Record<string, *string*[]>                      | :heavy_check_mark:                              | N/A                                             |
| `result`                                        | [models.Assessment](../../models/assessment.md) | :heavy_check_mark:                              | N/A                                             |