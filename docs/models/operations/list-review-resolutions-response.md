# ListReviewResolutionsResponse

## Example Usage

```typescript
import { ListReviewResolutionsResponse } from "@noresponse/node/models/operations";

let value: ListReviewResolutionsResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    items: [
      {
        reviewVersion: 115760,
        riskVersion: 498687,
        assessmentVersion: 945475,
        assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        conclusion: "benign",
        note: "Reviewed the retained account evidence and customer report.",
        createdBy: "usr_customer_admin",
        createdAt: "2026-01-01T00:00:00Z",
      },
    ],
  },
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `headers`                                                             | Record<string, *string*[]>                                            | :heavy_check_mark:                                                    | N/A                                                                   |
| `result`                                                              | [models.ReviewResolutionList](../../models/review-resolution-list.md) | :heavy_check_mark:                                                    | N/A                                                                   |