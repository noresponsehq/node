# ReviewPersonResponse

## Example Usage

```typescript
import { ReviewPersonResponse } from "@noresponse/node/models/operations";

let value: ReviewPersonResponse = {
  headers: {
    "key": [
      "example 1",
    ],
  },
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
        platform: "threads",
        handle: "jordan_example",
      },
    ],
    matchState: "possible",
    highestBand: "critical",
    decision: null,
    decisionNote: "Known to the venue team.",
    decidedBy: "user_2abc",
    decidedAt: "2026-01-01T00:00:00Z",
    coverage: {
      accountsFound: 862118,
      accountsAccessible: 501876,
      itemsRead: 942805,
      periodFrom: "2026-01-01T00:00:00Z",
      periodTo: "2026-01-02T00:00:00Z",
      platforms: [],
    },
    lastScreeningId: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    screenedAt: "2026-01-01T00:00:00Z",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
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
  },
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `headers`                               | Record<string, *string*[]>              | :heavy_check_mark:                      | N/A                                     |
| `result`                                | [models.Person](../../models/person.md) | :heavy_check_mark:                      | N/A                                     |