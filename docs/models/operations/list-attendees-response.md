# ListAttendeesResponse

## Example Usage

```typescript
import { ListAttendeesResponse } from "@noresponse/node/models/operations";

let value: ListAttendeesResponse = {
  headers: {
    "key": [
      "example 1",
    ],
  },
  result: {
    items: [
      {
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
        matchState: "none_found",
        highestBand: "moderate",
        decision: "watch",
        decisionNote: "Known to the venue team.",
        decidedBy: "user_2abc",
        decidedAt: "2026-01-01T00:00:00Z",
        coverage: {},
        lastScreeningId: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        screenedAt: "2026-01-01T00:00:00Z",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
      },
    ],
    nextAfter: "att_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `headers`                                            | Record<string, *string*[]>                           | :heavy_check_mark:                                   | N/A                                                  |
| `result`                                             | [models.AttendeeList](../../models/attendee-list.md) | :heavy_check_mark:                                   | N/A                                                  |