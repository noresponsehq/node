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
    "key1": [],
    "key2": [
      "example 1",
      "example 2",
      "example 3",
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
      lastScreeningId: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      screenedAt: "2026-01-01T00:00:00Z",
      createdAt: "2026-01-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
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
        access: "public",
        match: {
          state: "possible",
          evidence: [],
        },
        collector: "synthetic",
        itemsRead: 443528,
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
          evidence: [
            {
              signal: "clashes",
              kind: "username",
              field: "twitter_username",
              with: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
              withField: "username",
              bits: 7897.97,
            },
          ],
          path: [
            "given",
          ],
        },
      },
    ],
    findings: [
      {
        id: "fnd_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        category: "direct_threat",
        band: "low",
        confidence: 3564.17,
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
        spendMinor: 655904,
        createdAt: "2026-01-01T00:00:00Z",
      },
    ],
    posts: [],
    media: [],
    reviews: [
      {
        id: "arv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        decision: "escalated",
        note: "Known to the venue team.",
        createdBy: "user_2abc",
        createdAt: "2026-01-01T00:00:00Z",
      },
    ],
    lookup: {
      checks: [],
      answers: [
        {
          connector: "github",
          identifier: "phone",
          outcome: "inconclusive",
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
                rating: "distinctive",
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
              signal: "clashes",
              kind: "username",
              field: "twitter_username",
              with: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
              withField: "username",
              bits: 7897.97,
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
          rows: 156477,
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
        kind: "hash",
        value: "jordanexample42",
        status: "counted",
        sources: 298226,
        answered: 441806,
        found: 525806,
        estimatedSpend: 58157,
        spent: 400805,
        requestedBy: "user_2abc",
        parentSearchId: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
        createdAt: "2026-01-01T00:00:00Z",
        finishedAt: "2026-01-01T00:00:05Z",
      },
    ],
    suggestedSearches: [
      {
        recordId: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
        field: "username",
        kind: "username",
        likelihood: 0.87,
      },
    ],
    otherGroups: {
      total: 865004,
      items: [
        {
          groupId: "grp_01J9Y3C2M4N6P8Q0RSTVWXYZAB",
          groupName: "Spring gala",
          groupStartsAt: "2025-09-01T09:00:00Z",
          personId: "per_01J9Y3C2M4N6P8Q0RSTVWXYZAB",
          matchedOn: [
            "person_id",
          ],
          matchState: "probable",
          highestBand: "moderate",
          decision: "escalated",
          decidedBy: "user_2abc",
          decidedAt: "2025-09-01T12:00:00Z",
        },
      ],
    },
  },
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `headers`                                            | Record<string, *string*[]>                           | :heavy_check_mark:                                   | N/A                                                  |
| `result`                                             | [models.PersonReport](../../models/person-report.md) | :heavy_check_mark:                                   | N/A                                                  |