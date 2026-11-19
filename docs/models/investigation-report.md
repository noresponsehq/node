# InvestigationReport

Read an investigation and its evidence.

## Example Usage

```typescript
import { InvestigationReport } from "@noresponse/node/models";

let value: InvestigationReport = {
  profiles: [],
  findings: [],
  posts: [
    {
      id: "itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      kind: "post",
      text: "Great coffee this morning before the commute.",
      replyTo: "https://synthetic.invalid/synthetic/jordanexample42/p0",
      repostOf: "https://synthetic.invalid/synthetic/caseyexample7/p2",
      quoteOf: "https://synthetic.invalid/synthetic/caseyexample7/p3",
      place: {
        name: "Example Harbour",
        id: "212988663",
        address: "2 Wharf Road",
        city: "Melbourne",
      },
      tagged: [
        "caseyexample7",
      ],
      language: "en",
      postedWith: "Twitter for iPhone",
      profileId: "prf_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      permalink: "https://synthetic.invalid/synthetic/jordanexample42/p1",
      postedAt: "2026-01-01T00:00:00Z",
      screenshotSha256:
        "9c56cc51b374c3ba189210d5b6d4bf57790d351c96c47c02190ecf1e430635ab",
      capturedAt: "2026-01-01T00:00:00Z",
    },
  ],
  media: [],
  reviews: [],
  lookup: {
    checks: [
      {
        identifier: "username",
        lane: "accounts",
        status: "not_found",
        sources: 579434,
        answered: 904123,
        found: 555247,
        unanswered: [
          {
            connector: "github",
            reason: "blocked",
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
        matched: [],
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
        rows: 298226,
      },
    ],
    lookedAt: "2026-01-01T00:00:00Z",
  },
  person: {
    externalId: "case-person-1042",
    name: "Jordan Example",
    email: "jordan@example.com",
    phone: "+14155550100",
    company: "Example Ltd",
    city: "Melbourne",
    username: "jordan_example",
    handles: [
      {
        platform: "bluesky",
        handle: "jordan_example",
      },
    ],
    id: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    expiresAt: "2026-02-01T00:00:00Z",
  },
  investigation: {
    highestBand: "high",
    coverage: {
      accountsFound: 862118,
      accountsAccessible: 501876,
      itemsRead: 942805,
      periodFrom: "2026-01-01T00:00:00Z",
      periodTo: "2026-01-02T00:00:00Z",
      platforms: [],
      notSearched: [
        "instagram",
      ],
      timing: {
        startedAt: "2026-01-01T00:00:00Z",
        totalMs: 570887,
        stages: [
          {
            stage: "ai_typing",
            ms: 603969,
          },
        ],
      },
    },
    spend: {
      totalMinor: 806958,
      byImplementation: [
        {
          implementation: "synthetic",
          role: "collector",
          spendMinor: 249606,
        },
      ],
    },
    decision: "escalated",
    decisionNote: "Source records reviewed.",
    decidedBy: "user_investigator",
    decidedAt: "2026-01-01T00:00:00Z",
    id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    status: "partial",
    depth: "standard",
    platforms: [
      "x",
    ],
    matchState: "inaccessible",
    errorCode: "expired",
    createdAt: "2026-01-01T00:00:00Z",
    startedAt: "2026-01-01T00:00:00Z",
    finishedAt: "2026-01-01T00:00:00Z",
    expiresAt: "2026-02-01T00:00:00Z",
    deadlineAt: "2026-01-01T00:00:00Z",
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                     | Type                                                                                                                                                                                                                                                                                                      | Required                                                                                                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profiles`                                                                                                                                                                                                                                                                                                | [models.ScreeningProfile](../models/screening-profile.md)[]                                                                                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | The accounts this result matched, with how each was matched.                                                                                                                                                                                                                                              |
| `findings`                                                                                                                                                                                                                                                                                                | [models.ScreeningFinding](../models/screening-finding.md)[]                                                                                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | What this result flagged, most severe first, each citing its evidence.                                                                                                                                                                                                                                    |
| `posts`                                                                                                                                                                                                                                                                                                   | [models.ScreeningPost](../models/screening-post.md)[]                                                                                                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | All posts retained for this result, including posts that no finding cites.                                                                                                                                                                                                                                |
| `media`                                                                                                                                                                                                                                                                                                   | [models.ScreeningMedia](../models/screening-media.md)[]                                                                                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | All images and videos retained for this result, including media that no finding cites.                                                                                                                                                                                                                    |
| `reviews`                                                                                                                                                                                                                                                                                                 | [models.PersonReview](../models/person-review.md)[]                                                                                                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | Every recorded decision, oldest first.                                                                                                                                                                                                                                                                    |
| `lookup`                                                                                                                                                                                                                                                                                                  | [models.ScreeningLookup](../models/screening-lookup.md)                                                                                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                                                                                                                        | What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state. |
| `evidenceRestricted`                                                                                                                                                                                                                                                                                      | *boolean*                                                                                                                                                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                                                                                                                                                        | True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, findings, posts, media, discovered values and free-text decision notes are withheld.                                                                   |
| `person`                                                                                                                                                                                                                                                                                                  | [models.WorkspacePerson](../models/workspace-person.md)                                                                                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | N/A                                                                                                                                                                                                                                                                                                       |
| `investigation`                                                                                                                                                                                                                                                                                           | [models.Investigation](../models/investigation.md)                                                                                                                                                                                                                                                        | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | N/A                                                                                                                                                                                                                                                                                                       |