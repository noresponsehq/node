# WorkspacePeopleList

List workspace people.

## Example Usage

```typescript
import { WorkspacePeopleList } from "@noresponse/node/models";

let value: WorkspacePeopleList = {
  items: [],
  hasMore: true,
  nextCursor: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               | Example                                                   |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `items`                                                   | [models.WorkspacePerson](../models/workspace-person.md)[] | :heavy_check_mark:                                        | N/A                                                       |                                                           |
| `hasMore`                                                 | *boolean*                                                 | :heavy_check_mark:                                        | N/A                                                       |                                                           |
| `nextCursor`                                              | *string*                                                  | :heavy_check_mark:                                        | N/A                                                       | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM                            |