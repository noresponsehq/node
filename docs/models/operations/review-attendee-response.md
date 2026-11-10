# ReviewAttendeeResponse

## Example Usage

```typescript
import { ReviewAttendeeResponse } from "@noresponse/node/models/operations";

let value: ReviewAttendeeResponse = {
  headers: {
    "key": [],
    "key1": [
      "example 1",
    ],
  },
  result: {
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
    matchState: "unscreened",
    highestBand: "low",
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
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `headers`                                   | Record<string, *string*[]>                  | :heavy_check_mark:                          | N/A                                         |
| `result`                                    | [models.Attendee](../../models/attendee.md) | :heavy_check_mark:                          | N/A                                         |