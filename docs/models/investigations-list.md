# InvestigationsList

List investigation history.

## Example Usage

```typescript
import { InvestigationsList } from "@noresponse/node/models";

let value: InvestigationsList = {
  items: [
    {
      highestBand: "moderate",
      coverage: {
        accountsFound: 862118,
        accountsAccessible: 501876,
        itemsRead: 942805,
        periodFrom: "2026-01-01T00:00:00Z",
        periodTo: "2026-01-02T00:00:00Z",
        platforms: [],
        notSearched: [
          "instagram",
        ],
      },
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
      decision: "cleared",
      decisionNote: "Source records reviewed.",
      decidedBy: "user_investigator",
      decidedAt: "2026-01-01T00:00:00Z",
      id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      status: "cancelled",
      depth: "standard",
      platforms: [
        "x",
      ],
      matchState: "unscreened",
      errorCode: "expired",
      createdAt: "2026-01-01T00:00:00Z",
      startedAt: "2026-01-01T00:00:00Z",
      finishedAt: "2026-01-01T00:00:00Z",
      expiresAt: "2026-02-01T00:00:00Z",
      deadlineAt: "2026-01-01T00:00:00Z",
    },
  ],
  hasMore: true,
  nextCursor: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `items`                                              | [models.Investigation](../models/investigation.md)[] | :heavy_check_mark:                                   | N/A                                                  |                                                      |
| `hasMore`                                            | *boolean*                                            | :heavy_check_mark:                                   | N/A                                                  |                                                      |
| `nextCursor`                                         | *string*                                             | :heavy_check_mark:                                   | N/A                                                  | inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM                       |