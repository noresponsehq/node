# StartScreeningResponse

## Example Usage

```typescript
import { StartScreeningResponse } from "@noresponse/node/models/operations";

let value: StartScreeningResponse = {
  headers: {
    "key": [],
    "key1": [],
  },
  result: {
    id: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    eventId: "evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    environment: "live",
    status: "failed",
    depth: "standard",
    platforms: [],
    requestedBy: "user_2abc",
    createdAt: "2026-01-01T00:00:00Z",
    startedAt: "2026-01-01T00:00:00Z",
    finishedAt: "2026-01-02T00:00:00Z",
    expiresAt: "2026-01-02T00:00:00Z",
    attendeesTotal: 505954,
    attendeesDone: 977538,
    attendeesFlagged: 960583,
    attendeesFailed: 782149,
    estimatedSpend: 797695,
    spent: 916565,
    errorCode: "user_cancelled",
  },
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `headers`                                     | Record<string, *string*[]>                    | :heavy_check_mark:                            | N/A                                           |
| `result`                                      | [models.Screening](../../models/screening.md) | :heavy_check_mark:                            | N/A                                           |