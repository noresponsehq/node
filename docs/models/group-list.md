# GroupList

Groups, newest first.

## Example Usage

```typescript
import { GroupList } from "@noresponse/node/models";

let value: GroupList = {
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
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  | Example                                      |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `items`                                      | [models.Group](../models/group.md)[]         | :heavy_check_mark:                           | N/A                                          |                                              |
| `nextBefore`                                 | *string*                                     | :heavy_minus_sign:                           | Pass as before to read the next, older page. | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM               |