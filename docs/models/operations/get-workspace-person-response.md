# GetWorkspacePersonResponse

## Example Usage

```typescript
import { GetWorkspacePersonResponse } from "@noresponse/node/models/operations";

let value: GetWorkspacePersonResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key2": [
      "example 1",
      "example 2",
      "example 3",
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
      conflicts: [
        {
          signal: "anchors_disagree",
          kind: "person_name",
          between: [
            "phone",
          ],
          records: [
            "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
          ],
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
        kind: "username",
        value: "jordanexample42",
        status: "counted",
        sources: 649086,
        answered: 264360,
        found: 298226,
        estimatedSpend: 441806,
        spent: 525806,
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
    evidenceInvestigation: null,
    changes: [],
    schedule: {
      period: "off",
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