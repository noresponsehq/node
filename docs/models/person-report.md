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
        platform: "threads",
        handle: "jordan_example",
      },
    ],
    matchState: "none_found",
    highestBand: null,
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
  },
  profiles: [
    {
      id: "prf_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      platform: "synthetic",
      handle: "jordanexample42",
      url: "https://synthetic.invalid/synthetic/jordanexample42",
      displayName: "Jordan Example",
      bio: "Engineer at Example Ltd in Melbourne.",
      avatarUrl: "https://synthetic.invalid/avatar/3f9a1c22d4e5b6a7.png",
      accountCreatedAt: "2019-01-01T00:00:00Z",
      access: "private",
      match: {
        state: "confirmed",
        evidence: [
          {
            kind: "phone",
            detail: "the email on the person's row",
            resolver: "synthetic",
          },
        ],
      },
      collector: "synthetic",
      itemsRead: 874258,
      periodFrom: "2026-01-01T00:00:00Z",
      periodTo: "2026-01-02T00:00:00Z",
      collectedAt: "2026-01-02T00:00:00Z",
    },
  ],
  findings: [
    {
      id: "fnd_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      category: "disruption",
      band: "moderate",
      confidence: 3942.62,
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
      spendMinor: 412876,
      createdAt: "2026-01-01T00:00:00Z",
    },
  ],
  posts: [
    {
      id: "itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      kind: "post",
      text: "Great coffee this morning before the commute.",
      replyTo: "https://synthetic.invalid/synthetic/jordanexample42/p0",
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
      decision: "escalated",
      note: "Known to the venue team.",
      createdBy: "user_2abc",
      createdAt: "2026-01-01T00:00:00Z",
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
    lookedAt: "2026-01-01T00:00:00Z",
  },
  otherGroups: {
    total: 654334,
    items: [
      {
        groupId: "grp_01J9Y3C2M4N6P8Q0RSTVWXYZAB",
        groupName: "Spring gala",
        groupStartsAt: "2025-09-01T09:00:00Z",
        personId: "per_01J9Y3C2M4N6P8Q0RSTVWXYZAB",
        matchedOn: [],
        matchState: "confirmed",
        highestBand: "info",
        decision: "watch",
        decidedBy: "user_2abc",
        decidedAt: "2025-09-01T12:00:00Z",
      },
    ],
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                     | Type                                                                                                                                                                                                                                                                                                      | Required                                                                                                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `person`                                                                                                                                                                                                                                                                                                  | [models.Person](../models/person.md)                                                                                                                                                                                                                                                                      | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | A person and where their screening and review stand.                                                                                                                                                                                                                                                      |
| `profiles`                                                                                                                                                                                                                                                                                                | [models.ScreeningProfile](../models/screening-profile.md)[]                                                                                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | The accounts the latest screening matched, with how each was matched.                                                                                                                                                                                                                                     |
| `findings`                                                                                                                                                                                                                                                                                                | [models.ScreeningFinding](../models/screening-finding.md)[]                                                                                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | What the latest screening flagged, most severe first, each citing its evidence.                                                                                                                                                                                                                           |
| `posts`                                                                                                                                                                                                                                                                                                   | [models.ScreeningPost](../models/screening-post.md)[]                                                                                                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | The posts the findings cite.                                                                                                                                                                                                                                                                              |
| `media`                                                                                                                                                                                                                                                                                                   | [models.ScreeningMedia](../models/screening-media.md)[]                                                                                                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | The images and videos the findings cite.                                                                                                                                                                                                                                                                  |
| `reviews`                                                                                                                                                                                                                                                                                                 | [models.PersonReview](../models/person-review.md)[]                                                                                                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | Every recorded decision, oldest first.                                                                                                                                                                                                                                                                    |
| `lookup`                                                                                                                                                                                                                                                                                                  | [models.ScreeningLookup](../models/screening-lookup.md)                                                                                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                                                                                                                        | What the signup check's lookups found for a person: account presence for the email, phone and usernames (the person's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state. |
| `otherGroups`                                                                                                                                                                                                                                                                                             | [models.OtherGroups](../models/other-groups.md)                                                                                                                                                                                                                                                           | :heavy_check_mark:                                                                                                                                                                                                                                                                                        | Where else in the environment the person appears, read live from those groups: deleting one removes it here.                                                                                                                                                                                              |