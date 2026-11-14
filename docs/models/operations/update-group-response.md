# UpdateGroupResponse

## Example Usage

```typescript
import { UpdateGroupResponse } from "@noresponse/node/models/operations";

let value: UpdateGroupResponse = {
  headers: {
    "key": [
      "example 1",
    ],
  },
  result: {
    id: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    environment: "live",
    name: "Annual shareholder meeting",
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
    people: 233561,
    version: 125447,
    purgeAfter: "2026-02-01T00:00:00Z",
    createdBy: "user_2abc",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `headers`                             | Record<string, *string*[]>            | :heavy_check_mark:                    | N/A                                   |
| `result`                              | [models.Group](../../models/group.md) | :heavy_check_mark:                    | N/A                                   |