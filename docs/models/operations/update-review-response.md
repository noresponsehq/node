# UpdateReviewResponse

## Example Usage

```typescript
import { UpdateReviewResponse } from "@noresponse/node/models/operations";

let value: UpdateReviewResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    id: "rev_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    accountId: "acct_7f3a9c",
    status: "in_progress",
    priority: "high",
    assignee: "usr_customer_admin",
    version: 560330,
    openedRiskVersion: 722355,
    currentRiskVersion: 737640,
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
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `headers`                               | Record<string, *string*[]>              | :heavy_check_mark:                      | N/A                                     |
| `result`                                | [models.Review](../../models/review.md) | :heavy_check_mark:                      | N/A                                     |