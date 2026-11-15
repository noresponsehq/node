# ReviewInvestigationRequest

## Example Usage

```typescript
import { ReviewInvestigationRequest } from "@noresponse/node/models/operations";

let value: ReviewInvestigationRequest = {
  investigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {
    decision: "watch",
    note: "Known to the venue team.",
  },
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `investigationId`                                                   | *string*                                                            | :heavy_check_mark:                                                  | N/A                                                                 | inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                      |
| `body`                                                              | [models.PersonReviewRequest](../../models/person-review-request.md) | :heavy_check_mark:                                                  | N/A                                                                 |                                                                     |