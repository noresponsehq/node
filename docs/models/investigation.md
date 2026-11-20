# Investigation

## Example Usage

```typescript
import { Investigation } from "@noresponse/node/models";

let value: Investigation = {
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
  status: "cancelled",
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
};
```

## Fields

| Field                                                                                                                                                                      | Type                                                                                                                                                                       | Required                                                                                                                                                                   | Description                                                                                                                                                                | Example                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `coverage`                                                                                                                                                                 | [models.ScreeningCoverage](../models/screening-coverage.md)                                                                                                                | :heavy_check_mark:                                                                                                                                                         | The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see. |                                                                                                                                                                            |
| `spend`                                                                                                                                                                    | [models.ScreeningSpend](../models/screening-spend.md)                                                                                                                      | :heavy_check_mark:                                                                                                                                                         | What screening cost, in US cents, in total and per implementation.                                                                                                         |                                                                                                                                                                            |
| `id`                                                                                                                                                                       | *string*                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                         | N/A                                                                                                                                                                        | inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                             |
| `personId`                                                                                                                                                                 | *string*                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                         | N/A                                                                                                                                                                        | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                             |
| `groupId`                                                                                                                                                                  | *string*                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                         | N/A                                                                                                                                                                        | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                             |
| `status`                                                                                                                                                                   | [models.InvestigationStatus](../models/investigation-status.md)                                                                                                            | :heavy_check_mark:                                                                                                                                                         | N/A                                                                                                                                                                        |                                                                                                                                                                            |
| `depth`                                                                                                                                                                    | [models.ScreeningDepth](../models/screening-depth.md)                                                                                                                      | :heavy_check_mark:                                                                                                                                                         | N/A                                                                                                                                                                        |                                                                                                                                                                            |
| `platforms`                                                                                                                                                                | *string*[]                                                                                                                                                                 | :heavy_check_mark:                                                                                                                                                         | N/A                                                                                                                                                                        |                                                                                                                                                                            |
| `matchState`                                                                                                                                                               | [models.MatchState](../models/match-state.md)                                                                                                                              | :heavy_check_mark:                                                                                                                                                         | N/A                                                                                                                                                                        |                                                                                                                                                                            |
| `errorCode`                                                                                                                                                                | *string*                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                         | N/A                                                                                                                                                                        | expired                                                                                                                                                                    |
| `createdAt`                                                                                                                                                                | *string*                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                         | N/A                                                                                                                                                                        | 2026-01-01T00:00:00Z                                                                                                                                                       |
| `startedAt`                                                                                                                                                                | *string*                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                         | N/A                                                                                                                                                                        | 2026-01-01T00:00:00Z                                                                                                                                                       |
| `finishedAt`                                                                                                                                                               | *string*                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                         | N/A                                                                                                                                                                        | 2026-01-01T00:00:00Z                                                                                                                                                       |
| `expiresAt`                                                                                                                                                                | *string*                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                         | N/A                                                                                                                                                                        | 2026-02-01T00:00:00Z                                                                                                                                                       |
| `deadlineAt`                                                                                                                                                               | *string*                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                         | N/A                                                                                                                                                                        | 2026-01-01T00:00:00Z                                                                                                                                                       |