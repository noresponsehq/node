# GetAttendeeResponse

## Example Usage

```typescript
import { GetAttendeeResponse } from "@noresponse/node/models/operations";

let value: GetAttendeeResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
  },
  result: {
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
    profiles: [
      {
        id: "prf_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        platform: "youtube",
        handle: "jordanexample42",
        url: "https://synthetic.invalid/synthetic/jordanexample42",
        displayName: "Jordan Example",
        bio: "Engineer at Example Ltd in Melbourne.",
        avatarUrl: "https://synthetic.invalid/avatar/3f9a1c22d4e5b6a7.png",
        accountCreatedAt: "2019-01-01T00:00:00Z",
        access: "public",
        match: {
          state: "possible",
          evidence: [
            {
              kind: "city",
              detail: "the email on the attendee row",
              resolver: "synthetic",
            },
          ],
        },
        collector: "synthetic",
        itemsRead: 563927,
        periodFrom: "2026-01-01T00:00:00Z",
        periodTo: "2026-01-02T00:00:00Z",
        collectedAt: "2026-01-02T00:00:00Z",
      },
    ],
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
    posts: [],
    media: [],
    reviews: [
      {
        id: "arv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        decision: "cleared",
        note: "Known to the venue team.",
        createdBy: "user_2abc",
        createdAt: "2026-01-01T00:00:00Z",
      },
    ],
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
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `headers`                                                | Record<string, *string*[]>                               | :heavy_check_mark:                                       | N/A                                                      |
| `result`                                                 | [models.AttendeeReport](../../models/attendee-report.md) | :heavy_check_mark:                                       | N/A                                                      |