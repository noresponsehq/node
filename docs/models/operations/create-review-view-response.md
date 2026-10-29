# CreateReviewViewResponse

## Example Usage

```typescript
import { CreateReviewViewResponse } from "@noresponse/node/models/operations";

let value: CreateReviewViewResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [
      "example 1",
    ],
    "key2": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    id: "rvf_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    name: "High priority reviews",
    owner: "usr_customer_admin",
    ownerType: "user",
    shared: true,
    version: 430886,
    filter: {
      accountId: "acct_7f3a9c",
      assignee: "usr_customer_admin",
      assigneePrincipalId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    ownerPrincipalId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `headers`                                        | Record<string, *string*[]>                       | :heavy_check_mark:                               | N/A                                              |
| `result`                                         | [models.ReviewView](../../models/review-view.md) | :heavy_check_mark:                               | N/A                                              |