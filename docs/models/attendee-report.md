# AttendeeReport

Everything known about one attendee, and where else in the environment they appear.

## Example Usage

```typescript
import { AttendeeReport } from "@noresponse/node/models";

let value: AttendeeReport = {
  attendee: {
    id: "att_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    eventId: "evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    externalId: "ticket-1042",
    name: "Jordan Example",
    email: "jordan@company-example.com",
    phone: "+14155550100",
    company: "Example Ltd",
    city: "Melbourne",
    handles: [
      {
        platform: "instagram",
        handle: "jordan_example",
      },
    ],
    matchState: "inaccessible",
    highestBand: "moderate",
    decision: "escalated",
    decisionNote: "Known to the venue team.",
    decidedBy: "user_2abc",
    decidedAt: "2026-01-01T00:00:00Z",
    coverage: {
      accountsFound: 493700,
      accountsAccessible: 438267,
      itemsRead: 861570,
      periodFrom: "2026-01-01T00:00:00Z",
      periodTo: "2026-01-02T00:00:00Z",
      platforms: [
        {
          platform: "synthetic",
          status: "unavailable",
          accountsFound: 747529,
          itemsRead: 909182,
        },
      ],
    },
    lastScreeningId: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    screenedAt: "2026-01-01T00:00:00Z",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    spend: {
      totalMinor: 331453,
      byImplementation: [
        {
          implementation: "synthetic",
          role: "resolver",
          spendMinor: 424409,
        },
      ],
    },
  },
  profiles: [],
  findings: [
    {
      id: "fnd_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      category: "violent_extremism",
      band: "moderate",
      confidence: 3417.88,
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
      spendMinor: 492888,
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
  media: [],
  reviews: [],
  lookup: {
    checks: [],
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
  otherEvents: {
    total: 133678,
    items: [],
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                          | Type                                                                                                                                                                                                                                                                                                           | Required                                                                                                                                                                                                                                                                                                       | Description                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `attendee`                                                                                                                                                                                                                                                                                                     | [models.Attendee](../models/attendee.md)                                                                                                                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                                                                                                                                                             | An attendee and where their screening and review stand.                                                                                                                                                                                                                                                        |
| `profiles`                                                                                                                                                                                                                                                                                                     | [models.ScreeningProfile](../models/screening-profile.md)[]                                                                                                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                                                                                                                                                             | The accounts the latest screening matched, with how each was matched.                                                                                                                                                                                                                                          |
| `findings`                                                                                                                                                                                                                                                                                                     | [models.ScreeningFinding](../models/screening-finding.md)[]                                                                                                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                                                                                                                                                             | What the latest screening flagged, most severe first, each citing its evidence.                                                                                                                                                                                                                                |
| `posts`                                                                                                                                                                                                                                                                                                        | [models.ScreeningPost](../models/screening-post.md)[]                                                                                                                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                                                                                                                                                             | The posts the findings cite.                                                                                                                                                                                                                                                                                   |
| `media`                                                                                                                                                                                                                                                                                                        | [models.ScreeningMedia](../models/screening-media.md)[]                                                                                                                                                                                                                                                        | :heavy_check_mark:                                                                                                                                                                                                                                                                                             | The images and videos the findings cite.                                                                                                                                                                                                                                                                       |
| `reviews`                                                                                                                                                                                                                                                                                                      | [models.AttendeeReview](../models/attendee-review.md)[]                                                                                                                                                                                                                                                        | :heavy_check_mark:                                                                                                                                                                                                                                                                                             | Every recorded decision, oldest first.                                                                                                                                                                                                                                                                         |
| `lookup`                                                                                                                                                                                                                                                                                                       | [models.ScreeningLookup](../models/screening-lookup.md)                                                                                                                                                                                                                                                        | :heavy_minus_sign:                                                                                                                                                                                                                                                                                             | What the signup check's lookups found for an attendee: account presence for the email, phone and usernames (the attendee's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state. |
| `otherEvents`                                                                                                                                                                                                                                                                                                  | [models.OtherEvents](../models/other-events.md)                                                                                                                                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                                                                                                                                             | Where else in the environment the attendee appears, read live from those events: deleting one removes it here.                                                                                                                                                                                                 |