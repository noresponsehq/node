# ListGroupsResponse

## Example Usage

```typescript
import { ListGroupsResponse } from "@noresponse/node/models/operations";

let value: ListGroupsResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key1": [],
    "key2": [
      "example 1",
      "example 2",
      "example 3",
    ],
  },
  result: {
    items: [
      {
        id: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        environment: "test",
        name: "Annual shareholder meeting",
        startsAt: "2026-01-01T00:00:00Z",
        endsAt: "2026-01-02T00:00:00Z",
        venue: "Example Convention Centre",
        host: "Example Holdings",
        principals: [],
        topics: [
          "executive pay",
        ],
        people: 783119,
        version: 83134,
        purgeAfter: "2026-02-01T00:00:00Z",
        createdBy: "user_2abc",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
      },
    ],
    nextBefore: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `headers`                                      | Record<string, *string*[]>                     | :heavy_check_mark:                             | N/A                                            |
| `result`                                       | [models.GroupList](../../models/group-list.md) | :heavy_check_mark:                             | N/A                                            |