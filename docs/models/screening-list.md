# ScreeningList

Screenings, newest first.

## Example Usage

```typescript
import { ScreeningList } from "@noresponse/node/models";

let value: ScreeningList = {
  items: [
    {
      id: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
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
      peopleTotal: 614872,
      peopleDone: 17533,
      peopleFlagged: 47314,
      peopleFailed: 12333,
      peoplePartial: 496149,
      estimatedSpend: 576065,
      spent: 12709,
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
  ],
  nextBefore: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  | Example                                      |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `items`                                      | [models.Screening](../models/screening.md)[] | :heavy_check_mark:                           | N/A                                          |                                              |
| `nextBefore`                                 | *string*                                     | :heavy_minus_sign:                           | Pass as before to read the next, older page. | scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM               |