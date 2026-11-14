# PersonDecided

A reviewer recorded a decision on a person. The decision's note stays in the API. Sent once per recorded review; a person's latest review is its decision, so order by decided_at.

## Example Usage

```typescript
import { PersonDecided } from "@noresponse/node/models";

let value: PersonDecided = {
  groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  reviewId: "arv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  decision: "watch",
  decidedBy:
    "email:2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae",
  decidedAt: "2026-11-20T09:03:27.000Z",
};
```

## Fields

| Field                                                                                           | Type                                                                                            | Required                                                                                        | Description                                                                                     | Example                                                                                         |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `groupId`                                                                                       | *string*                                                                                        | :heavy_check_mark:                                                                              | The person's group.                                                                             | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                  |
| `personId`                                                                                      | *string*                                                                                        | :heavy_check_mark:                                                                              | The person decided on.                                                                          | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                  |
| `reviewId`                                                                                      | *string*                                                                                        | :heavy_check_mark:                                                                              | The recorded review.                                                                            | arv_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                  |
| `decision`                                                                                      | [models.PersonDecision](../models/person-decision.md)                                           | :heavy_check_mark:                                                                              | N/A                                                                                             |                                                                                                 |
| `decidedBy`                                                                                     | *string*                                                                                        | :heavy_check_mark:                                                                              | Who decided: the member's external user id, or the API key's label, as the person's decided_by. | email:2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae                          |
| `decidedAt`                                                                                     | *string*                                                                                        | :heavy_check_mark:                                                                              | When the decision was recorded; equal to the event's created_at.                                | 2026-11-20T09:03:27.000Z                                                                        |