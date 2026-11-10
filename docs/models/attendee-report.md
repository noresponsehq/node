# AttendeeReport

Everything known about one attendee.

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
      evidence: [
        "itm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
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
};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `attendee`                                                                      | [models.Attendee](../models/attendee.md)                                        | :heavy_check_mark:                                                              | An attendee and where their screening and review stand.                         |
| `profiles`                                                                      | [models.ScreeningProfile](../models/screening-profile.md)[]                     | :heavy_check_mark:                                                              | The accounts the latest screening matched, with how each was matched.           |
| `findings`                                                                      | [models.ScreeningFinding](../models/screening-finding.md)[]                     | :heavy_check_mark:                                                              | What the latest screening flagged, most severe first, each citing its evidence. |
| `posts`                                                                         | [models.ScreeningPost](../models/screening-post.md)[]                           | :heavy_check_mark:                                                              | The posts the findings cite.                                                    |
| `media`                                                                         | [models.ScreeningMedia](../models/screening-media.md)[]                         | :heavy_check_mark:                                                              | The images and videos the findings cite.                                        |
| `reviews`                                                                       | [models.AttendeeReview](../models/attendee-review.md)[]                         | :heavy_check_mark:                                                              | Every recorded decision, oldest first.                                          |