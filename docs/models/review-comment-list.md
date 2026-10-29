# ReviewCommentList

Read retained review comments.

## Example Usage

```typescript
import { ReviewCommentList } from "@noresponse/node/models";

let value: ReviewCommentList = {
  items: [
    {
      id: "rvc_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      reviewVersion: 8914,
      body: "Reviewed the retained account evidence and customer report.",
      createdBy: "usr_customer_admin",
      createdAt: "2026-01-01T00:00:00Z",
    },
  ],
  nextCursor:
    "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `items`                                                                    | [models.ReviewComment](../models/review-comment.md)[]                      | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `nextCursor`                                                               | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ |