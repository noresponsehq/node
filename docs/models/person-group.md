# PersonGroup

One group the person belongs to and their role in it.

## Example Usage

```typescript
import { PersonGroup } from "@noresponse/node/models";

let value: PersonGroup = {
  groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  groupName: "Annual shareholder meeting",
  groupStartsAt: "2026-01-01T00:00:00Z",
  role: "guest",
  addedAt: "2026-01-01T00:00:00Z",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `groupId`                                                                                    | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                               |
| `groupName`                                                                                  | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          | Annual shareholder meeting                                                                   |
| `groupStartsAt`                                                                              | *string*                                                                                     | :heavy_check_mark:                                                                           | The group's optional event start; null for an ongoing group.                                 | 2026-01-01T00:00:00Z                                                                         |
| `role`                                                                                       | [models.PersonRole](../models/person-role.md)                                                | :heavy_check_mark:                                                                           | The person's role in the group: guest, crew, vendor or press, or null when it was not given. |                                                                                              |
| `addedAt`                                                                                    | *string*                                                                                     | :heavy_check_mark:                                                                           | When the person was added to the group.                                                      | 2026-01-01T00:00:00Z                                                                         |