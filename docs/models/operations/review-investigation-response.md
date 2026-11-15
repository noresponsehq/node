# ReviewInvestigationResponse

## Example Usage

```typescript
import { ReviewInvestigationResponse } from "@noresponse/node/models/operations";

let value: ReviewInvestigationResponse = {
  headers: {
    "key": [],
    "key1": [],
  },
  result: {
    highestBand: null,
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
    decision: "watch",
    decisionNote: "Source records reviewed.",
    decidedBy: "user_investigator",
    decidedAt: "2026-01-01T00:00:00Z",
    id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    status: "unknown",
    depth: "standard",
    platforms: [
      "x",
    ],
    matchState: "probable",
    errorCode: "expired",
    createdAt: "2026-01-01T00:00:00Z",
    startedAt: "2026-01-01T00:00:00Z",
    finishedAt: "2026-01-01T00:00:00Z",
    expiresAt: "2026-02-01T00:00:00Z",
    deadlineAt: "2026-01-01T00:00:00Z",
  },
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `headers`                                             | Record<string, *string*[]>                            | :heavy_check_mark:                                    | N/A                                                   |
| `result`                                              | [models.Investigation](../../models/investigation.md) | :heavy_check_mark:                                    | N/A                                                   |