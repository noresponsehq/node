# AccountDirectoryPageItem

## Example Usage

```typescript
import { AccountDirectoryPageItem } from "@noresponse/node/models";

let value: AccountDirectoryPageItem = {
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
  assessments: 1664,
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

| Field                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Required                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `waitingFor`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | [models.WaitingFor](../models/waiting-for.md)[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Present for needs_action searches. outcome means a current review/block decision lacks a retained effective outcome; review means a retained open or in-progress review. Both can apply.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `accountId`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | *string*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '\|' is accepted so an Auth0 user id such as 'auth0\|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id. | acct_7f3a9c                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `latest`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | [models.AssessmentRevision](../models/assessment-revision.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Retrieve a retained assessment version with its original decision, policy, flow and depth. This response excludes the current account decision. Current retention and response-mode permissions still apply.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `current`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | [models.Account](../models/account.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling workspace's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment, plus the account's own reason shared_api_key when a key issued to the account was used from many IP addresses or countries (POST /v1/key_usage/batches). Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments).                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `assessments`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | *number*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Count of admitted retained assessments belonging to this account, not just the returned page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `matchedIdentifier`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | [models.IdentifierMatch](../models/identifier-match.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Why this result matched a typed identifier search. value is the original value submitted in assessment_id. Provenance records a customer submission, not a source discovery or verified ownership. Equality is deterministic and has no inferred confidence score. An account result names its newest retained matching assessment, which can differ from latest.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | {<br/>"kind": "username",<br/>"value": "JaneDoe",<br/>"match_basis": "canonical",<br/>"namespace": "customer",<br/>"provenance": "submitted",<br/>"assessment_id": "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM"<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `matchedIdentifiers`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | [models.IdentifierTermMatch](../models/identifier-term-match.md)[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Present only for identifier_expression. All satisfied unique terms, ordered by term_index, with original submitted values and retained assessment witnesses. A duplicate normalized term appears once at its first raw leaf index. The legacy single identifier filter instead returns matched_identifier.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |