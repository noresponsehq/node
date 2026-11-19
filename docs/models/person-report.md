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
    decision: "cleared",
    decisionNote: "Known to the venue team.",
    decidedBy: "user_2abc",
    decidedAt: "2026-01-01T00:00:00Z",
    coverage: {
      accountsFound: 835107,
      accountsAccessible: 274781,
      itemsRead: 862118,
      periodFrom: "2026-01-01T00:00:00Z",
      periodTo: "2026-01-02T00:00:00Z",
      platforms: [
        {
          platform: "bluesky",
          status: "unavailable",
          accountsFound: 373294,
          itemsRead: 570887,
        },
      ],
      notSearched: [
        "instagram",
      ],
      timing: {
        startedAt: "2026-01-01T00:00:00Z",
        totalMs: 906374,
        stages: [
          {
            stage: "late_lookup",
            ms: 806958,
          },
        ],
      },
    },
    lastScreeningId: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    screenedAt: "2026-01-01T00:00:00Z",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    spend: {
      totalMinor: 956527,
      byImplementation: [
        {
          implementation: "synthetic",
          role: "resolver",
          spendMinor: 949972,
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
        state: "possible",
        evidence: [],
      },
      collector: "synthetic",
      itemsRead: 722829,
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
              rating: "common",
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
        evidence: [
          {
            signal: "found_by",
            kind: "username",
            field: "twitter_username",
            with: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
            withField: "username",
            bits: 2511.99,
          },
        ],
        path: [
          "given",
        ],
      },
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
      mediaType: "image",
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
  reviews: [
    {
      id: "arv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      decision: "watch",
      note: "Known to the venue team.",
      createdBy: "user_2abc",
      createdAt: "2026-01-01T00:00:00Z",
    },
  ],
  lookup: {
    checks: [
      {
        identifier: "phone",
        lane: "ip",
        status: "not_covered",
        sources: 802959,
        answered: 72494,
        found: 734559,
        unanswered: [
          {
            connector: "github",
            reason: "blocked",
          },
        ],
      },
    ],
    answers: [
      {
        connector: "github",
        identifier: "username",
        outcome: "not_found",
        answeredAt: "2026-01-01T00:00:02Z",
      },
    ],
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
              rating: "common",
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
        evidence: [
          {
            signal: "found_by",
            kind: "username",
            field: "twitter_username",
            with: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
            withField: "username",
            bits: 2511.99,
          },
        ],
        path: [
          "given",
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
        rows: 579434,
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
      kind: "domain",
      value: "jordanexample42",
      status: "running",
      sources: 336986,
      answered: 156477,
      found: 649086,
      estimatedSpend: 264360,
      spent: 298226,
      requestedBy: "user_2abc",
      parentSearchId: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
      createdAt: "2026-01-01T00:00:00Z",
      finishedAt: "2026-01-01T00:00:05Z",
    },
  ],
  suggestedSearches: [],
  otherGroups: {
    total: 525806,
    items: [],
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                                                                                                                    | Type                                                                                                                                                                                                                                                                                                                                                                                                     | Required                                                                                                                                                                                                                                                                                                                                                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `person`                                                                                                                                                                                                                                                                                                                                                                                                 | [models.Person](../models/person.md)                                                                                                                                                                                                                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                       | A person and where their screening and review stand.                                                                                                                                                                                                                                                                                                                                                     |
| `profiles`                                                                                                                                                                                                                                                                                                                                                                                               | [models.ScreeningProfile](../models/screening-profile.md)[]                                                                                                                                                                                                                                                                                                                                              | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                       | The accounts this result matched, with how each was matched.                                                                                                                                                                                                                                                                                                                                             |
| `posts`                                                                                                                                                                                                                                                                                                                                                                                                  | [models.ScreeningPost](../models/screening-post.md)[]                                                                                                                                                                                                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                       | All posts retained for this result.                                                                                                                                                                                                                                                                                                                                                                      |
| `media`                                                                                                                                                                                                                                                                                                                                                                                                  | [models.ScreeningMedia](../models/screening-media.md)[]                                                                                                                                                                                                                                                                                                                                                  | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                       | All images and videos retained for this result.                                                                                                                                                                                                                                                                                                                                                          |
| `reviews`                                                                                                                                                                                                                                                                                                                                                                                                | [models.PersonReview](../models/person-review.md)[]                                                                                                                                                                                                                                                                                                                                                      | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                       | Every recorded decision, oldest first.                                                                                                                                                                                                                                                                                                                                                                   |
| `lookup`                                                                                                                                                                                                                                                                                                                                                                                                 | [models.ScreeningLookup](../models/screening-lookup.md)                                                                                                                                                                                                                                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                       | What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Nothing here sets a match state.                                                                                                                                                                |
| `searches`                                                                                                                                                                                                                                                                                                                                                                                               | [models.Search](../models/search.md)[]                                                                                                                                                                                                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                       | The searches on this person's values in this group, newest first: each names the value, the record and field it came from, and the search that found that record. Absent when nothing was searched.                                                                                                                                                                                                      |
| `suggestedSearches`                                                                                                                                                                                                                                                                                                                                                                                      | [models.SuggestedSearch](../models/suggested-search.md)[]                                                                                                                                                                                                                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                       | The searches enrichment would start on this person in this group, likeliest record first. Group screening follows the environment's enrichment setting, with suggest as its mode while the workspace has not set one. In off mode the list is empty. In suggest mode enrichment starts none of them by itself; in automatic mode it starts them as its limits allow. Empty when evidence.read is denied. |
| `otherGroups`                                                                                                                                                                                                                                                                                                                                                                                            | [models.OtherGroups](../models/other-groups.md)                                                                                                                                                                                                                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                       | Where else in the environment the person appears, read live from those groups: deleting one removes it here.                                                                                                                                                                                                                                                                                             |
| `evidenceRestricted`                                                                                                                                                                                                                                                                                                                                                                                     | *boolean*                                                                                                                                                                                                                                                                                                                                                                                                | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                       | True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, posts, media, discovered values and free-text decision notes are withheld.                                                                                                                                                                            |