# ScreeningList

Screenings, newest first.

## Example Usage

```typescript
import { ScreeningList } from "@noresponse/node/models";

let value: ScreeningList = {
  items: [
    {
      id: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      eventId: "evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      environment: "live",
      status: "partial",
      depth: "standard",
      platforms: [
        "bluesky",
      ],
      requestedBy: "user_2abc",
      createdAt: "2026-01-01T00:00:00Z",
      startedAt: "2026-01-01T00:00:00Z",
      finishedAt: "2026-01-02T00:00:00Z",
      expiresAt: "2026-01-02T00:00:00Z",
      attendeesTotal: 614872,
      attendeesDone: 17533,
      attendeesFlagged: 47314,
      attendeesFailed: 12333,
      estimatedSpend: 496149,
      spent: 576065,
      errorCode: "user_cancelled",
    },
  ],
  nextBefore: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  | Example                                      |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `items`                                      | [models.Screening](../models/screening.md)[] | :heavy_check_mark:                           | N/A                                          |                                              |
| `nextBefore`                                 | *string*                                     | :heavy_minus_sign:                           | Pass as before to read the next, older page. | scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM               |