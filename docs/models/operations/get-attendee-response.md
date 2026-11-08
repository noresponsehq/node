# GetAttendeeResponse

## Example Usage

```typescript
import { GetAttendeeResponse } from "@noresponse/node/models/operations";

let value: GetAttendeeResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key2": [
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
      coverage: {},
      lastScreeningId: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      screenedAt: "2026-01-01T00:00:00Z",
      createdAt: "2026-01-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
    },
    profiles: [
      {},
    ],
    findings: [],
    reviews: [],
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `headers`                                                | Record<string, *string*[]>                               | :heavy_check_mark:                                       | N/A                                                      |
| `result`                                                 | [models.AttendeeReport](../../models/attendee-report.md) | :heavy_check_mark:                                       | N/A                                                      |