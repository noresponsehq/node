# ExportPeopleRequest

## Example Usage

```typescript
import { ExportPeopleRequest } from "@noresponse/node/models/operations";

let value: ExportPeopleRequest = {
  groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                                             | Type                                                                              | Required                                                                          | Description                                                                       | Example                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `groupId`                                                                         | *string*                                                                          | :heavy_check_mark:                                                                | N/A                                                                               | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                    |
| `limit`                                                                           | *number*                                                                          | :heavy_minus_sign:                                                                | At most this many people.                                                         |                                                                                   |
| `after`                                                                           | *string*                                                                          | :heavy_minus_sign:                                                                | Read people after this one.                                                       |                                                                                   |
| `band`                                                                            | [models.ListPeopleBand](../../models/list-people-band.md)                         | :heavy_minus_sign:                                                                | Only people whose highest finding has this band; none for people with no finding. |                                                                                   |
| `decision`                                                                        | [models.ListPeopleDecision](../../models/list-people-decision.md)                 | :heavy_minus_sign:                                                                | Only people with this decision; undecided for none yet.                           |                                                                                   |
| `role`                                                                            | [models.ListPeopleRole](../../models/list-people-role.md)                         | :heavy_minus_sign:                                                                | Only people with this role; unstated for people whose role was not given.         |                                                                                   |