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
      unanswered: [
        {
          connector: "github",
          reason: "timed_out",
        },
      ],
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
          search: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        },
      ],
      fields: [
        {
          field: "creation_date",
          original: "2019-01-01T00:00:00Z",
          value: "2019-01-01T00:00:00Z",
          detail: "bcrypt",
          distinctive: {
            rating: "unique",
            reason: "in 4 breach rows",
          },
        },
      ],
      observedAt: "2026-01-02T00:00:00Z",
      agreed: [
        "lastip",
      ],
      clashed: [
        "dob",
      ],
    },
  ],
  remaining: [
    {
      source: {
        connector: "bluesky",
        kind: "platform",
        site: "bsky.app",
        table: "users",
        date: "2019-03",
      },
      by: "email",
      search: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      rows: 251199,
    },
  ],
  lookedAt: "2026-01-01T00:00:00Z",
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                                                                                                                  | Type                                                                                                                                                                                                                                                                                                                                                                                                   | Required                                                                                                                                                                                                                                                                                                                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                            | Example                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `checks`                                                                                                                                                                                                                                                                                                                                                                                               | [models.ScreeningLookupCheck](../models/screening-lookup-check.md)[]                                                                                                                                                                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                     | Each lane each identifier was looked up in, identifiers in the order email, phone, username and lanes in the order accounts, phone, breach, domain. Every lane the person's identifiers are looked up in is listed: one that no source answered, or that no source could be asked in, is not_covered. Empty when the person has no email, phone or handle to look up.                                  |                                                                                                                                                                                                                                                                                                                                                                                                        |
| `summary`                                                                                                                                                                                                                                                                                                                                                                                              | [models.RiskSummary](../models/risk-summary.md)                                                                                                                                                                                                                                                                                                                                                        | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                     | A few typed facts per identifier: an assessment's risk.summary, and a screened person's lookup summary. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer.                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                        |
| `details`                                                                                                                                                                                                                                                                                                                                                                                              | [models.RiskDetails](../models/risk-details.md)                                                                                                                                                                                                                                                                                                                                                        | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                     | Merged observations behind the summary, served only to a caller who may read evidence: no provider, source, origin, raw breach record or score.                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                        |
| `records`                                                                                                                                                                                                                                                                                                                                                                                              | [models.RecordT](../models/record-t.md)[]                                                                                                                                                                                                                                                                                                                                                              | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                     | What each source answered, whole, each answer once: every field of each account a connector found, and every column of each breach row the person's email or usernames matched, under the source's own names, and what each search a person started found, each match naming its search. Anyone who may read the person reads them: no extra permission applies, breach passwords and hashes included. |                                                                                                                                                                                                                                                                                                                                                                                                        |
| `remaining`                                                                                                                                                                                                                                                                                                                                                                                            | [models.RecordRemaining](../models/record-remaining.md)[]                                                                                                                                                                                                                                                                                                                                              | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                     | For each search and source whose matched rows records leave out, how many: a breach search returns at most 20 rows of a table and 100 in all, from its first 64 tables by name. A search a person starts on one table of its source fetches the rest of that table, up to 100 rows. Absent when records hold every matched row.                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lookedAt`                                                                                                                                                                                                                                                                                                                                                                                             | *string*                                                                                                                                                                                                                                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                     | When the lookups ran.                                                                                                                                                                                                                                                                                                                                                                                  | 2026-01-01T00:00:00Z                                                                                                                                                                                                                                                                                                                                                                                   |