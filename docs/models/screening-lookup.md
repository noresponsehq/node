# ScreeningLookup

What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.

## Example Usage

```typescript
import { ScreeningLookup } from "@noresponse/node/models";

let value: ScreeningLookup = {
  checks: [
    {
      identifier: "username",
      lane: "phone",
      status: "not_covered",
      sources: 683033,
      answered: 533262,
      found: 637323,
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
  records: [
    {
      id: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
      source: {
        connector: "bluesky",
        kind: "platform",
        site: "bsky.app",
        table: "users",
        date: "2019-03",
      },
      matched: [
        {
          by: "handle",
          field: "username",
        },
      ],
      fields: [
        {
          field: "creation_date",
          original: "2019-01-01T00:00:00Z",
          kind: "date_time",
          role: "joined",
          value: "2019-01-01T00:00:00Z",
        },
      ],
      observedAt: "2026-01-02T00:00:00Z",
    },
  ],
  lookedAt: "2026-01-01T00:00:00Z",
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                                                                                 | Type                                                                                                                                                                                                                                                                                                                                                                  | Required                                                                                                                                                                                                                                                                                                                                                              | Description                                                                                                                                                                                                                                                                                                                                                           | Example                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checks`                                                                                                                                                                                                                                                                                                                                                              | [models.ScreeningLookupCheck](../models/screening-lookup-check.md)[]                                                                                                                                                                                                                                                                                                  | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                    | Each lane each identifier was looked up in, identifiers in the order email, phone, username and lanes in the order accounts, phone, breach, domain. Every lane the person's identifiers are looked up in is listed: one that no source answered, or that no source could be asked in, is not_covered. Empty when the person has no email, phone or handle to look up. |                                                                                                                                                                                                                                                                                                                                                                       |
| `summary`                                                                                                                                                                                                                                                                                                                                                             | [models.RiskSummary](../models/risk-summary.md)                                                                                                                                                                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                    | A few typed facts per identifier: an assessment's risk.summary, and a screened person's lookup summary. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer.                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                       |
| `details`                                                                                                                                                                                                                                                                                                                                                             | [models.RiskDetails](../models/risk-details.md)                                                                                                                                                                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                    | Merged observations behind the summary, served only to a caller who may read evidence: no provider, source, origin, raw breach record or score.                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                       |
| `records`                                                                                                                                                                                                                                                                                                                                                             | [models.RecordT](../models/record-t.md)[]                                                                                                                                                                                                                                                                                                                             | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                    | What each source that found an account answered, whole: every field under the source's own names, each answer once. Served only to a caller who may read evidence, as details are.                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                       |
| `lookedAt`                                                                                                                                                                                                                                                                                                                                                            | *string*                                                                                                                                                                                                                                                                                                                                                              | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                    | When the lookups ran.                                                                                                                                                                                                                                                                                                                                                 | 2026-01-01T00:00:00Z                                                                                                                                                                                                                                                                                                                                                  |