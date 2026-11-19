# GetWorkspacePersonResponse

## Example Usage

```typescript
import { GetWorkspacePersonResponse } from "@noresponse/node/models/operations";

let value: GetWorkspacePersonResponse = {
  headers: {
    "key": [],
    "key1": [
      "example 1",
      "example 2",
    ],
  },
  result: {
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
    groups: [],
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
    evidenceInvestigation: {
      highestBand: "info",
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
      decision: "watch",
      decisionNote: "Source records reviewed.",
      decidedBy: "user_investigator",
      decidedAt: "2026-01-01T00:00:00Z",
      id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      status: "cancelled",
      depth: "standard",
      platforms: [
        "x",
      ],
      matchState: null,
      errorCode: "expired",
      createdAt: "2026-01-01T00:00:00Z",
      startedAt: "2026-01-01T00:00:00Z",
      finishedAt: "2026-01-01T00:00:00Z",
      expiresAt: "2026-02-01T00:00:00Z",
      deadlineAt: "2026-01-01T00:00:00Z",
    },
    writtenProfile: {
      status: "failed",
      investigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      queuedAt: "2026-01-01T00:00:00Z",
      finishedAt: "2026-01-01T00:00:11Z",
      summary: "Likely lives in Lisbon and uses one username across sites.",
      statements: [
        {
          topic: "location",
          text: "Lived in Lisbon in 2019.",
          certainty: "possible",
          basis: "inferred",
          alternatives: [
            "A holiday address.",
          ],
          evidence: [
            {
              kind: "check",
              id: "rec_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
            },
          ],
        },
      ],
      leads: [
        {
          value: "jordan.example@example.net",
          kind: "email",
          why: "A linked record holds an older address.",
          evidence: [],
        },
      ],
    },
    changes: [],
    schedule: {
      period: "monthly",
      nextRunAt: "2026-01-03T00:00:00Z",
      lastInvestigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
      lastError: "screening_cap_exceeded",
      updatedAt: "2026-01-02T00:00:00Z",
      updatedBy: "Jane Analyst",
    },
  },
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `headers`                                                               | Record<string, *string*[]>                                              | :heavy_check_mark:                                                      | N/A                                                                     |
| `result`                                                                | [models.WorkspacePersonReport](../../models/workspace-person-report.md) | :heavy_check_mark:                                                      | N/A                                                                     |