# CreateInvestigationResponse

## Example Usage

```typescript
import { CreateInvestigationResponse } from "@noresponse/node/models/operations";

let value: CreateInvestigationResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [],
  },
  result: {
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
    decision: null,
    decisionNote: "Source records reviewed.",
    decidedBy: "user_investigator",
    decidedAt: "2026-01-01T00:00:00Z",
    id: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    status: "completed",
    depth: "standard",
    platforms: [
      "x",
    ],
    matchState: "inaccessible",
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