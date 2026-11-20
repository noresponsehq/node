# InvestigationReport

Read an investigation and its evidence.

## Example Usage

```typescript
import { InvestigationReport } from "@noresponse/node/models";

let value: InvestigationReport = {
  profiles: [],
  posts: [],
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
    id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    status: "completed",
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
};
```

## Fields

| Field                                                                                                                                                                                                                                     | Type                                                                                                                                                                                                                                      | Required                                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profiles`                                                                                                                                                                                                                                | [models.ScreeningProfile](../models/screening-profile.md)[]                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                                        | The accounts this result matched, with how each was matched.                                                                                                                                                                              |
| `posts`                                                                                                                                                                                                                                   | [models.ScreeningPost](../models/screening-post.md)[]                                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                                        | All posts retained for this result.                                                                                                                                                                                                       |
| `media`                                                                                                                                                                                                                                   | [models.ScreeningMedia](../models/screening-media.md)[]                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                        | All images and videos retained for this result.                                                                                                                                                                                           |
| `lookup`                                                                                                                                                                                                                                  | [models.ScreeningLookup](../models/screening-lookup.md)                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                                                        | What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Nothing here sets a match state. |
| `evidenceRestricted`                                                                                                                                                                                                                      | *boolean*                                                                                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                                                                                        | True when evidence.read is explicitly denied. Submitted details, coverage and job status remain available. Collected records, profiles, posts, media and discovered values are withheld.                                                  |
| `person`                                                                                                                                                                                                                                  | [models.WorkspacePerson](../models/workspace-person.md)                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                        | N/A                                                                                                                                                                                                                                       |
| `investigation`                                                                                                                                                                                                                           | [models.Investigation](../models/investigation.md)                                                                                                                                                                                        | :heavy_check_mark:                                                                                                                                                                                                                        | N/A                                                                                                                                                                                                                                       |