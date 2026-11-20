# InvestigationsList

List investigation history.

## Example Usage

```typescript
import { InvestigationsList } from "@noresponse/node/models";

let value: InvestigationsList = {
  items: [
    {
      coverage: {
        accountsFound: 835107,
        accountsAccessible: 274781,
        itemsRead: 862118,
        periodFrom: "2026-01-01T00:00:00Z",
        periodTo: "2026-01-02T00:00:00Z",
        platforms: [
          {
            platform: "bluesky",
            status: "unavailable",
            accountsFound: 373294,
            itemsRead: 570887,
          },
        ],
        notSearched: [
          "instagram",
        ],
        timing: {
          startedAt: "2026-01-01T00:00:00Z",
          totalMs: 906374,
          stages: [
            {
              stage: "late_lookup",
              ms: 806958,
            },
          ],
        },
      },
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
      id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      status: "partial",
      depth: "standard",
      platforms: [
        "x",
      ],
      matchState: "confirmed",
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