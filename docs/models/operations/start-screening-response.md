# StartScreeningResponse

## Example Usage

```typescript
import { StartScreeningResponse } from "@noresponse/node/models/operations";

let value: StartScreeningResponse = {
  headers: {},
  result: {
    id: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    environment: "live",
    status: "failed",
    depth: "standard",
    platforms: [],
    requestedBy: "user_2abc",
    createdAt: "2026-01-01T00:00:00Z",
    startedAt: "2026-01-01T00:00:00Z",
    finishedAt: "2026-01-02T00:00:00Z",
    expiresAt: "2026-01-02T00:00:00Z",
    peopleTotal: 505954,
    peopleDone: 977538,
    peopleFlagged: 960583,
    peopleFailed: 782149,
    peoplePartial: 797695,
    estimatedSpend: 916565,
    spent: 646472,
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
    errorCode: "user_cancelled",
  },
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `headers`                                     | Record<string, *string*[]>                    | :heavy_check_mark:                            | N/A                                           |
| `result`                                      | [models.Screening](../../models/screening.md) | :heavy_check_mark:                            | N/A                                           |