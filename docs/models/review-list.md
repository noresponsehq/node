# ReviewList

List retained account reviews.

## Example Usage

```typescript
import { ReviewList } from "@noresponse/node/models";

let value: ReviewList = {
  items: [],
  nextCursor:
    "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `items`                                                                    | [models.Review](../models/review.md)[]                                     | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `nextCursor`                                                               | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ |