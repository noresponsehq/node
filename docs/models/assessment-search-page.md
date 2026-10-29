# AssessmentSearchPage

A bounded page of latest assessment revisions, newest creation first, with how many assessments match the filters. Each item is the revision found and its first answer's decision; no current account risk is attached.

## Example Usage

```typescript
import { AssessmentSearchPage } from "@noresponse/node/models";

let value: AssessmentSearchPage = {
  schemaVersion: "1",
  items: [
    {
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
    },
  ],
  total: 418880,
  totalCapped: true,
  nextCursor:
    "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
};
```

## Fields

| Field                                                                                                                                                                                                                                                      | Type                                                                                                                                                                                                                                                       | Required                                                                                                                                                                                                                                                   | Description                                                                                                                                                                                                                                                | Example                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `schemaVersion`                                                                                                                                                                                                                                            | *"1"*                                                                                                                                                                                                                                                      | :heavy_check_mark:                                                                                                                                                                                                                                         | Version of the body shape.                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                            |
| `items`                                                                                                                                                                                                                                                    | [models.AssessmentSearchItem](../models/assessment-search-item.md)[]                                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                                                                                                         | N/A                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                            |
| `total`                                                                                                                                                                                                                                                    | *number*                                                                                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                                         | How many assessments match the filters over every page, counted when this page was read: exact up to 10000. At 10000 or more it is 10000 and total_capped is true. The cursor does not change it; a later page can count differently, as results are live. |                                                                                                                                                                                                                                                            |
| `totalCapped`                                                                                                                                                                                                                                              | *boolean*                                                                                                                                                                                                                                                  | :heavy_check_mark:                                                                                                                                                                                                                                         | True when at least 10000 assessments match, so total is 10000 and not the exact count.                                                                                                                                                                     |                                                                                                                                                                                                                                                            |
| `nextCursor`                                                                                                                                                                                                                                               | *string*                                                                                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                                                                         | Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged.                                                                                                                                                 | eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ                                                                                                                                                                                 |
| `retentionDays`                                                                                                                                                                                                                                            | *number*                                                                                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                                                                         | The calling workspace's configured retention period in days. Default 365 (12 months), which is also the maximum: a workspace may only shorten it, to at least 1 day. Each record expires from its own created_at; see assessment expires_at.               |                                                                                                                                                                                                                                                            |