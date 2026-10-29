# ListReviewCommentsResponse

## Example Usage

```typescript
import { ListReviewCommentsResponse } from "@noresponse/node/models/operations";

let value: ListReviewCommentsResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    items: [],
    nextCursor:
      "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
  },
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `headers`                                                       | Record<string, *string*[]>                                      | :heavy_check_mark:                                              | N/A                                                             |
| `result`                                                        | [models.ReviewCommentList](../../models/review-comment-list.md) | :heavy_check_mark:                                              | N/A                                                             |