# WorkspacePersonReport

Read a workspace person.

## Example Usage

```typescript
import { WorkspacePersonReport } from "@noresponse/node/models";

let value: WorkspacePersonReport = {
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
  changes: [
    {
      id: "chg_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      kind: "posts_added",
      significance: "low",
      source: "github",
      field: "email",
      before: "jane@example.com",
      after: "jane.doe@example.com",
      investigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
      previousInvestigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      createdAt: "2026-01-02T00:00:00Z",
      reviewedAt: "2026-01-02T00:05:00Z",
      reviewedBy: "Jane Analyst",
    },
  ],
  schedule: {
    period: "off",
    nextRunAt: "2026-01-03T00:00:00Z",
    lastInvestigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
    lastError: "screening_cap_exceeded",
    updatedAt: "2026-01-02T00:00:00Z",
    updatedBy: "Jane Analyst",
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                                                       | Type                                                                                                                                                                                                                                                                                                                                        | Required                                                                                                                                                                                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                                                                                 | Example                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `externalId`                                                                                                                                                                                                                                                                                                                                | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | Your reference for this person within the workspace environment. Only an explicit reference or person_id can reuse an existing person.                                                                                                                                                                                                      | case-person-1042                                                                                                                                                                                                                                                                                                                            |
| `name`                                                                                                                                                                                                                                                                                                                                      | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | N/A                                                                                                                                                                                                                                                                                                                                         | Jordan Example                                                                                                                                                                                                                                                                                                                              |
| `email`                                                                                                                                                                                                                                                                                                                                     | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | The person's email.                                                                                                                                                                                                                                                                                                                         | jordan@example.com                                                                                                                                                                                                                                                                                                                          |
| `phone`                                                                                                                                                                                                                                                                                                                                     | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | The person's phone in E.164 form.                                                                                                                                                                                                                                                                                                           | +14155550100                                                                                                                                                                                                                                                                                                                                |
| `company`                                                                                                                                                                                                                                                                                                                                   | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | Where the person works.                                                                                                                                                                                                                                                                                                                     | Example Ltd                                                                                                                                                                                                                                                                                                                                 |
| `city`                                                                                                                                                                                                                                                                                                                                      | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | Where the person lives.                                                                                                                                                                                                                                                                                                                     | Melbourne                                                                                                                                                                                                                                                                                                                                   |
| `username`                                                                                                                                                                                                                                                                                                                                  | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | A username the person uses, with no platform. A search looks it up on every platform that finds accounts by username.                                                                                                                                                                                                                       | jordan_example                                                                                                                                                                                                                                                                                                                              |
| `handles`                                                                                                                                                                                                                                                                                                                                   | [models.Handle](../models/handle.md)[]                                                                                                                                                                                                                                                                                                      | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | Accounts the person is known to hold, at most 20.                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                             |
| `id`                                                                                                                                                                                                                                                                                                                                        | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | N/A                                                                                                                                                                                                                                                                                                                                         | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                                                                                                                                                                                              |
| `createdAt`                                                                                                                                                                                                                                                                                                                                 | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | N/A                                                                                                                                                                                                                                                                                                                                         | 2026-01-01T00:00:00Z                                                                                                                                                                                                                                                                                                                        |
| `updatedAt`                                                                                                                                                                                                                                                                                                                                 | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | N/A                                                                                                                                                                                                                                                                                                                                         | 2026-01-01T00:00:00Z                                                                                                                                                                                                                                                                                                                        |
| `expiresAt`                                                                                                                                                                                                                                                                                                                                 | *string*                                                                                                                                                                                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | The time the workspace retention policy removes this person, their evidence and investigation history. Shortening workspace retention can move this time earlier.                                                                                                                                                                           | 2026-02-01T00:00:00Z                                                                                                                                                                                                                                                                                                                        |
| `groups`                                                                                                                                                                                                                                                                                                                                    | [models.PersonGroup](../models/person-group.md)[]                                                                                                                                                                                                                                                                                           | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | Every group this person belongs to in this environment, most recently added first, with their role in each. A person can belong to any number of groups; removing them from a group or deleting the group removes it here.                                                                                                                  |                                                                                                                                                                                                                                                                                                                                             |
| `profiles`                                                                                                                                                                                                                                                                                                                                  | [models.ScreeningProfile](../models/screening-profile.md)[]                                                                                                                                                                                                                                                                                 | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | The accounts this result matched, with how each was matched.                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                             |
| `posts`                                                                                                                                                                                                                                                                                                                                     | [models.ScreeningPost](../models/screening-post.md)[]                                                                                                                                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | All posts retained for this result.                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                             |
| `media`                                                                                                                                                                                                                                                                                                                                     | [models.ScreeningMedia](../models/screening-media.md)[]                                                                                                                                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | All images and videos retained for this result.                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                             |
| `lookup`                                                                                                                                                                                                                                                                                                                                    | [models.ScreeningLookup](../models/screening-lookup.md)                                                                                                                                                                                                                                                                                     | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Nothing here sets a match state.                                                                                                   |                                                                                                                                                                                                                                                                                                                                             |
| `searches`                                                                                                                                                                                                                                                                                                                                  | [models.Search](../models/search.md)[]                                                                                                                                                                                                                                                                                                      | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | Every search on this person's values, newest first, whether a person started it or enrichment did: each names the value, the record and field it came from, and the search that found that record. Absent when nothing was searched.                                                                                                        |                                                                                                                                                                                                                                                                                                                                             |
| `suggestedSearches`                                                                                                                                                                                                                                                                                                                         | [models.SuggestedSearch](../models/suggested-search.md)[]                                                                                                                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | The searches enrichment would start on this person, likeliest record first, under the environment's enrichment setting for a person's own investigation. In off mode the list is empty. In suggest mode enrichment starts none of them by itself; in automatic mode it starts them as its limits allow. Empty when evidence.read is denied. |                                                                                                                                                                                                                                                                                                                                             |
| `evidenceRestricted`                                                                                                                                                                                                                                                                                                                        | *boolean*                                                                                                                                                                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, posts, media, discovered values and free-text decision notes are withheld.                                                                                                               |                                                                                                                                                                                                                                                                                                                                             |
| `evidenceInvestigation`                                                                                                                                                                                                                                                                                                                     | [models.Investigation](../models/investigation.md)                                                                                                                                                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | The most recent retained completed or partial investigation, or a migrated result whose original per-person status is unknown. The evidence below belongs to this investigation. Read investigation history for earlier results and pending jobs.                                                                                           |                                                                                                                                                                                                                                                                                                                                             |
| `changes`                                                                                                                                                                                                                                                                                                                                   | [models.PersonChange](../models/person-change.md)[]                                                                                                                                                                                                                                                                                         | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | What changed between each settled investigation of this person and the one before it, unreviewed first, then most significant, then newest. The first investigation records no changes. When evidence.read is denied, before and after are withheld.                                                                                        |                                                                                                                                                                                                                                                                                                                                             |
| `schedule`                                                                                                                                                                                                                                                                                                                                  | [models.PersonSchedule](../models/person-schedule.md)                                                                                                                                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | The person's rerun schedule. Each due run starts a full investigation of the person, as POST /v1/investigations does, and its changes are stored as changes. The schedule lives in the database and the worker runs it, so it survives restarts and releases; each due run starts exactly one investigation.                                |                                                                                                                                                                                                                                                                                                                                             |