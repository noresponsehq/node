# GetWorkspacePersonResponse

## Example Usage

```typescript
import { GetWorkspacePersonResponse } from "@noresponse/node/models/operations";

let value: GetWorkspacePersonResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key1": [],
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
    profiles: [],
    findings: [
      {
        id: "fnd_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        category: "violent_extremism",
        band: "info",
        confidence: 724.94,
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
        spendMinor: 734559,
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
    searches: [
      {
        searchId: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        recordId: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
        field: "username",
        table: "FORUM_EXAMPLE_COM_2019",
        kind: "person_name",
        value: "jordanexample42",
        status: "running",
        sources: 58157,
        answered: 400805,
        found: 664258,
        estimatedSpend: 865004,
        spent: 941722,
        requestedBy: "user_2abc",
        parentSearchId: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
        createdAt: "2026-01-01T00:00:00Z",
        finishedAt: "2026-01-01T00:00:05Z",
      },
    ],
    suggestedSearches: [],
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
      decision: "escalated",
      decisionNote: "Source records reviewed.",
      decidedBy: "user_investigator",
      decidedAt: "2026-01-01T00:00:00Z",
      id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      status: "completed",
      depth: "standard",
      platforms: [
        "x",
      ],
      matchState: "unscreened",
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
  },
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `headers`                                                               | Record<string, *string*[]>                                              | :heavy_check_mark:                                                      | N/A                                                                     |
| `result`                                                                | [models.WorkspacePersonReport](../../models/workspace-person-report.md) | :heavy_check_mark:                                                      | N/A                                                                     |