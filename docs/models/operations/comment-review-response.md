# CommentReviewResponse

## Example Usage

```typescript
import { CommentReviewResponse } from "@noresponse/node/models/operations";

let value: CommentReviewResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [],
    "key2": [
      "example 1",
      "example 2",
      "example 3",
    ],
  },
  result: {
    id: "rvc_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    reviewVersion: 327998,
    body: "Reviewed the retained account evidence and customer report.",
    createdBy: "usr_customer_admin",
    createdAt: "2026-01-01T00:00:00Z",
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `headers`                                              | Record<string, *string*[]>                             | :heavy_check_mark:                                     | N/A                                                    |
| `result`                                               | [models.ReviewComment](../../models/review-comment.md) | :heavy_check_mark:                                     | N/A                                                    |