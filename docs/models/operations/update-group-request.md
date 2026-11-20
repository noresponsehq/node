# UpdateGroupRequest

## Example Usage

```typescript
import { UpdateGroupRequest } from "@noresponse/node/models/operations";

let value: UpdateGroupRequest = {
  groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {
    name: "Annual shareholder meeting",
    attribute: "Example Fund",
    startsAt: "2026-01-01T00:00:00Z",
    endsAt: "2026-01-02T00:00:00Z",
    venue: "Example Convention Centre",
    host: "Example Holdings",
    principals: [
      {
        name: "Alex Principal",
        aliases: [
          "Alex P",
        ],
      },
    ],
    topics: [
      "executive pay",
    ],
  },
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        | Example                                            |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `groupId`                                          | *string*                                           | :heavy_check_mark:                                 | N/A                                                | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM                     |
| `body`                                             | [models.GroupUpdate](../../models/group-update.md) | :heavy_check_mark:                                 | N/A                                                |                                                    |