# ReviewPersonRequest

## Example Usage

```typescript
import { ReviewPersonRequest } from "@noresponse/node/models/operations";

let value: ReviewPersonRequest = {
  groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {
    decision: "watch",
    note: "Known to the venue team.",
  },
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `groupId`                                                           | *string*                                                            | :heavy_check_mark:                                                  | N/A                                                                 | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                      |
| `personId`                                                          | *string*                                                            | :heavy_check_mark:                                                  | N/A                                                                 | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                      |
| `body`                                                              | [models.PersonReviewRequest](../../models/person-review-request.md) | :heavy_check_mark:                                                  | N/A                                                                 |                                                                     |