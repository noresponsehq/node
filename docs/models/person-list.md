# PersonList

People in upload order.

## Example Usage

```typescript
import { PersonList } from "@noresponse/node/models";

let value: PersonList = {
  items: [
    {
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
      matchState: "confirmed",
      highestBand: "moderate",
      decision: "watch",
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
  ],
  nextAfter: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            | Example                                |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `items`                                | [models.Person](../models/person.md)[] | :heavy_check_mark:                     | N/A                                    |                                        |
| `nextAfter`                            | *string*                               | :heavy_minus_sign:                     | Pass as after to read the next page.   | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM         |