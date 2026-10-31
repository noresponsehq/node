# QueryReviewsResponse

## Example Usage

```typescript
import { QueryReviewsResponse } from "@noresponse/node/models/operations";

let value: QueryReviewsResponse = {
  headers: {
    "key": [],
    "key1": [
      "example 1",
    ],
  },
  result: {
    items: [
      {
        id: "rev_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        accountId: "acct_7f3a9c",
        status: "in_progress",
        priority: "urgent",
        assignee: "usr_customer_admin",
        version: 363436,
        openedRiskVersion: 671724,
        currentRiskVersion: 739200,
        createdBy: "usr_customer_admin",
        updatedBy: "usr_customer_admin",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
        expiresAt: "2026-01-01T00:00:00Z",
        resolution: {
          reviewVersion: 14631,
          riskVersion: 128847,
          assessmentVersion: 245001,
          assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
          conclusion: "inconclusive",
          note: "Reviewed the retained account evidence and customer report.",
          createdBy: "usr_customer_admin",
          createdAt: "2026-01-01T00:00:00Z",
        },
        assigneePrincipalId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      },
    ],
    nextCursor:
      "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
  },
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `headers`                                        | Record<string, *string*[]>                       | :heavy_check_mark:                               | N/A                                              |
| `result`                                         | [models.ReviewList](../../models/review-list.md) | :heavy_check_mark:                               | N/A                                              |