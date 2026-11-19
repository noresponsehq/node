# CancelScreeningResponse

## Example Usage

```typescript
import { CancelScreeningResponse } from "@noresponse/node/models/operations";

let value: CancelScreeningResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [],
  },
  result: {
    id: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    environment: "live",
    status: "failed",
    depth: "standard",
    platforms: [
      "bluesky",
    ],
    requestedBy: "user_2abc",
    createdAt: "2026-01-01T00:00:00Z",
    startedAt: "2026-01-01T00:00:00Z",
    finishedAt: "2026-01-02T00:00:00Z",
    expiresAt: "2026-01-02T00:00:00Z",
    peopleTotal: 226495,
    peopleDone: 505954,
    peopleFailed: 977538,
    peoplePartial: 960583,
    estimatedSpend: 782149,
    spent: 797695,
    spend: {
      totalMinor: 956527,
      byImplementation: [
        {
          implementation: "synthetic",
          role: "resolver",
          spendMinor: 949972,
        },
      ],
    },
    errorCode: "user_cancelled",
  },
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `headers`                                     | Record<string, *string*[]>                    | :heavy_check_mark:                            | N/A                                           |
| `result`                                      | [models.Screening](../../models/screening.md) | :heavy_check_mark:                            | N/A                                           |