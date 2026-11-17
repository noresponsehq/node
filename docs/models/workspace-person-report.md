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
  profiles: [],
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
  posts: [],
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
  suggestedSearches: [
    {
      recordId: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
      field: "username",
      kind: "username",
      likelihood: 0.87,
    },
  ],
  evidenceInvestigation: null,
  writtenProfile: {
    status: "written",
    investigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    queuedAt: "2026-01-01T00:00:00Z",
    finishedAt: "2026-01-01T00:00:11Z",
    summary: "Likely lives in Lisbon and uses one username across sites.",
    statements: [
      {
        topic: "credentials",
        text: "Lived in Lisbon in 2019.",
        certainty: "possible",
        basis: "inferred",
        alternatives: [
          "A holiday address.",
        ],
        evidence: [],
      },
    ],
    leads: [
      {
        value: "jordan.example@example.net",
        kind: "email",
        why: "A linked record holds an older address.",
        evidence: [
          {
            kind: "record",
            id: "rec_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
          },
        ],
      },
    ],
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
| `profiles`                                                                                                                                                                                                                                                                                                                                  | [models.ScreeningProfile](../models/screening-profile.md)[]                                                                                                                                                                                                                                                                                 | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | The accounts this result matched, with how each was matched.                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                                                                                                                                                             |
| `findings`                                                                                                                                                                                                                                                                                                                                  | [models.ScreeningFinding](../models/screening-finding.md)[]                                                                                                                                                                                                                                                                                 | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | What this result flagged, most severe first, each citing its evidence.                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                             |
| `posts`                                                                                                                                                                                                                                                                                                                                     | [models.ScreeningPost](../models/screening-post.md)[]                                                                                                                                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | All posts retained for this result, including posts that no finding cites.                                                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                             |
| `media`                                                                                                                                                                                                                                                                                                                                     | [models.ScreeningMedia](../models/screening-media.md)[]                                                                                                                                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | All images and videos retained for this result, including media that no finding cites.                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                             |
| `lookup`                                                                                                                                                                                                                                                                                                                                    | [models.ScreeningLookup](../models/screening-lookup.md)                                                                                                                                                                                                                                                                                     | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.                                   |                                                                                                                                                                                                                                                                                                                                             |
| `searches`                                                                                                                                                                                                                                                                                                                                  | [models.Search](../models/search.md)[]                                                                                                                                                                                                                                                                                                      | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | Every search on this person's values, newest first, whether a person started it or enrichment did: each names the value, the record and field it came from, and the search that found that record. Absent when nothing was searched.                                                                                                        |                                                                                                                                                                                                                                                                                                                                             |
| `suggestedSearches`                                                                                                                                                                                                                                                                                                                         | [models.SuggestedSearch](../models/suggested-search.md)[]                                                                                                                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | The searches enrichment would start on this person, likeliest record first, under the environment's enrichment setting for a person's own investigation. In off mode the list is empty. In suggest mode enrichment starts none of them by itself; in automatic mode it starts them as its limits allow. Empty when evidence.read is denied. |                                                                                                                                                                                                                                                                                                                                             |
| `evidenceRestricted`                                                                                                                                                                                                                                                                                                                        | *boolean*                                                                                                                                                                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                          | True when evidence.read is explicitly denied. Submitted details, coverage, job status and decisions remain available. Collected records, profiles, findings, posts, media, discovered values and free-text decision notes are withheld.                                                                                                     |                                                                                                                                                                                                                                                                                                                                             |
| `evidenceInvestigation`                                                                                                                                                                                                                                                                                                                     | [models.Investigation](../models/investigation.md)                                                                                                                                                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | The most recent retained completed or partial investigation, or a migrated result whose original per-person status is unknown. The evidence below belongs to this investigation. Read investigation history for earlier results and pending jobs.                                                                                           |                                                                                                                                                                                                                                                                                                                                             |
| `writtenProfile`                                                                                                                                                                                                                                                                                                                            | [models.WrittenProfile](../models/written-profile.md)                                                                                                                                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                          | An investigator's profile of this person, written from the evidence of a settled investigation. Null until an investigation completes or partially completes, and null when evidence.read is denied.                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                             |