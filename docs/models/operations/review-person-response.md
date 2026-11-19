# ReviewPersonResponse

## Example Usage

```typescript
import { ReviewPersonResponse } from "@noresponse/node/models/operations";

let value: ReviewPersonResponse = {
  headers: {},
  result: {
    id: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    externalId: "ticket-1042",
    name: "Jordan Example",
    email: "jordan@company-example.com",
    phone: "+14155550100",
    company: "Example Ltd",
    city: "Melbourne",
    handles: [
      {
        platform: "bluesky",
        handle: "jordan_example",
      },
    ],
    matchState: "possible",
    decision: "cleared",
    decisionNote: "Known to the venue team.",
    decidedBy: "user_2abc",
    decidedAt: "2026-01-01T00:00:00Z",
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
    lastScreeningId: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    screenedAt: "2026-01-01T00:00:00Z",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
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
    expiresAt: "2026-02-01T00:00:00Z",
  },
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `headers`                               | Record<string, *string*[]>              | :heavy_check_mark:                      | N/A                                     |
| `result`                                | [models.Person](../../models/person.md) | :heavy_check_mark:                      | N/A                                     |