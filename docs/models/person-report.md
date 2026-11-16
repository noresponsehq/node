# PersonReport

Everything known about one person, and where else in the environment they appear.

## Example Usage

```typescript
import { PersonReport } from "@noresponse/node/models";

let value: PersonReport = {
  person: {
    id: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    externalId: "ticket-1042",
    name: "Jordan Example",
    email: "jordan@company-example.com",
    phone: "+14155550100",
    company: "Example Ltd",
    city: "Melbourne",
    handles: [
      {
        platform: "bluesky",
        handle: "jordan_example",
      },
    ],
    matchState: "possible",
    highestBand: "critical",
    decision: "cleared",
    decisionNote: "Known to the venue team.",
    decidedBy: "user_2abc",
    decidedAt: "2026-01-01T00:00:00Z",
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
    },
    lastScreeningId: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    screenedAt: "2026-01-01T00:00:00Z",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    spend: {
      totalMinor: 570887,
      byImplementation: [
        {
          implementation: "synthetic",
          role: "analyser",
          spendMinor: 603969,
        },
      ],
    },
    expiresAt: "2026-02-01T00:00:00Z",
  },
  profiles: [
    {
      id: "prf_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      platform: "bluesky",
      handle: "jordanexample42",
      url: "https://synthetic.invalid/synthetic/jordanexample42",
      displayName: "Jordan Example",
      bio: "Engineer at Example Ltd in Melbourne.",
      avatarUrl: "https://synthetic.invalid/avatar/3f9a1c22d4e5b6a7.png",
      accountCreatedAt: "2019-01-01T00:00:00Z",
      access: "locked",
      match: {
        state: "probable",
        evidence: [],
      },
      collector: "synthetic",
      itemsRead: 949972,
      periodFrom: "2026-01-01T00:00:00Z",
      periodTo: "2026-01-02T00:00:00Z",
      collectedAt: "2026-01-02T00:00:00Z",
      record: {
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
    },
  ],
  findings: [
    {
      id: "fnd_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      category: "movement_exposure",
      band: "low",
      confidence: 4970.22,
      rationale: "The post reports when the principal leaves the hotel.",
      quote:
        "Spotted Jordan Lee leaving the hotel, they always take the side exit at seven.",
      evidence: [
        "itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      ],
      mediaObservations: [
        {
          mediaId: "itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
          description: "A handwritten sign held up outside the venue.",
          readText: "SEE YOU ON THE 1ST",
        },
      ],
      analyser: "synthetic",
      model: "synthetic-1",
      spendMinor: 722829,
      createdAt: "2026-01-01T00:00:00Z",
    },
  ],
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
  media: [
    {
      id: "itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      kind: "media",
      postId: "itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      mediaType: "video",
      mediaUrl: "https://synthetic.invalid/media/jordanexample42/p1.jpg",
      coverOf: "itm_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
      text: "A photo",
      profileId: "prf_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      permalink: "https://synthetic.invalid/synthetic/jordanexample42/p1",
      postedAt: "2026-01-01T00:00:00Z",
      screenshotSha256:
        "9c56cc51b374c3ba189210d5b6d4bf57790d351c96c47c02190ecf1e430635ab",
      capturedAt: "2026-01-01T00:00:00Z",
    },
  ],
  reviews: [],
  lookup: {
    checks: [
      {
        identifier: "email",
        lane: "domain",
        status: "not_found",
        sources: 655904,
        answered: 262056,
        found: 455794,
        unanswered: [
          {
            connector: "github",
            reason: "unavailable",
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
        fields: [],
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
  },
  searches: [
    {
      searchId: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      recordId: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
      field: "username",
      table: "FORUM_EXAMPLE_COM_2019",
      kind: "password",
      value: "jordanexample42",
      status: "failed",
      sources: 555247,
      answered: 336986,
      found: 156477,
      estimatedSpend: 649086,
      spent: 264360,
      requestedBy: "user_2abc",
      parentSearchId: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
      createdAt: "2026-01-01T00:00:00Z",
      finishedAt: "2026-01-01T00:00:05Z",
    },
  ],
  otherGroups: {
    total: 298226,
    items: [],
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                     | Type                                                                                                                                                                                                                                                                                                      | Required                                                                                                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `person`                                                                                                                                                                                                                                                                                                  | [models.Person](../models/person.md)                                                                                                                                                                                                                                                                      | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | A person and where their screening and review stand.                                                                                                                                                                                                                                                      |
| `profiles`                                                                                                                                                                                                                                                                                                | [models.ScreeningProfile](../models/screening-profile.md)[]                                                                                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | The accounts this result matched, with how each was matched.                                                                                                                                                                                                                                              |
| `findings`                                                                                                                                                                                                                                                                                                | [models.ScreeningFinding](../models/screening-finding.md)[]                                                                                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | What this result flagged, most severe first, each citing its evidence.                                                                                                                                                                                                                                    |
| `posts`                                                                                                                                                                                                                                                                                                   | [models.ScreeningPost](../models/screening-post.md)[]                                                                                                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | All posts retained for this result, including posts that no finding cites.                                                                                                                                                                                                                                |
| `media`                                                                                                                                                                                                                                                                                                   | [models.ScreeningMedia](../models/screening-media.md)[]                                                                                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | All images and videos retained for this result, including media that no finding cites.                                                                                                                                                                                                                    |
| `reviews`                                                                                                                                                                                                                                                                                                 | [models.PersonReview](../models/person-review.md)[]                                                                                                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | Every recorded decision, oldest first.                                                                                                                                                                                                                                                                    |
| `lookup`                                                                                                                                                                                                                                                                                                  | [models.ScreeningLookup](../models/screening-lookup.md)                                                                                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                                                                                                                        | What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state. |
| `searches`                                                                                                                                                                                                                                                                                                | [models.Search](../models/search.md)[]                                                                                                                                                                                                                                                                    | :heavy_minus_sign:                                                                                                                                                                                                                                                                                        | The searches on this person's values in this group, newest first: each names the value, the record and field it came from, and the search that found that record. Absent when nothing was searched.                                                                                                       |
| `otherGroups`                                                                                                                                                                                                                                                                                             | [models.OtherGroups](../models/other-groups.md)                                                                                                                                                                                                                                                           | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | Where else in the environment the person appears, read live from those groups: deleting one removes it here.                                                                                                                                                                                              |
| `evidenceRestricted`                                                                                                                                                                                                                                                                                      | *boolean*                                                                                                                                                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                                                                                                                                                        | True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, findings, posts, media, discovered values and free-text decision notes are withheld.                                                                   |