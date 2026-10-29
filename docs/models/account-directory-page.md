# AccountDirectoryPage

Distinct observed accounts with retained assessments. Typed identifier searches use stable opaque account order, independent of newly submitted assessments; ordinary and legacy email searches use newest-seen order. One repeatable-read database snapshot supplies each page's rows and totals. Pages do not share a snapshot: new matching accounts may appear on a later page or before the cursor and be missed until a fresh search; retention, erasure and changed membership can remove results. Current account decisions are read separately and may advance during a page. Cursors bind the workspace/environment, operation and filters, expire, and cannot cross scopes. Erasure and retention always take precedence over pagination.

## Example Usage

```typescript
import { AccountDirectoryPage } from "@noresponse/node/models";

let value: AccountDirectoryPage = {
  schemaVersion: "1",
  items: [
    {
      accountId: "acct_7f3a9c",
      latest: {
        schemaVersion: "1",
        id: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        status: "partial",
        flow: "login",
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
      current: {
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
        riskVersion: 226996,
      },
      assessments: 136523,
      matchedIdentifier: {
        kind: "username",
        value: "JaneDoe",
        matchBasis: "canonical",
        provenance: "submitted",
        namespace: "customer",
        assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      },
    },
  ],
  total: 373385,
  totalCapped: true,
  nextCursor:
    "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
};
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                | Example                                                                                                    |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `schemaVersion`                                                                                            | *"1"*                                                                                                      | :heavy_check_mark:                                                                                         | Version of the body shape.                                                                                 |                                                                                                            |
| `items`                                                                                                    | [models.AccountDirectoryPageItem](../models/account-directory-page-item.md)[]                              | :heavy_check_mark:                                                                                         | N/A                                                                                                        |                                                                                                            |
| `total`                                                                                                    | *number*                                                                                                   | :heavy_check_mark:                                                                                         | Distinct accounts matching the filters, exact below 10000 and capped at 10000.                             |                                                                                                            |
| `totalCapped`                                                                                              | *boolean*                                                                                                  | :heavy_check_mark:                                                                                         | True when at least 10000 accounts match.                                                                   |                                                                                                            |
| `nextCursor`                                                                                               | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged. | eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ                                 |