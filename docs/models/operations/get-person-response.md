# GetPersonResponse

## Example Usage

```typescript
import { GetPersonResponse } from "@noresponse/node/models/operations";

let value: GetPersonResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
  },
  result: {
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
    profiles: [],
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
  },
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `headers`                                            | Record<string, *string*[]>                           | :heavy_check_mark:                                   | N/A                                                  |
| `result`                                             | [models.PersonReport](../../models/person-report.md) | :heavy_check_mark:                                   | N/A                                                  |