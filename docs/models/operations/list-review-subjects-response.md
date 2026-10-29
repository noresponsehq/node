# ListReviewSubjectsResponse

## Example Usage

```typescript
import { ListReviewSubjectsResponse } from "@noresponse/node/models/operations";

let value: ListReviewSubjectsResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
      "example 2",
      "example 3",
    ],
  },
  result: {
    reviewVersion: 498146,
    items: [
      {
        id: "rvs_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        kind: "assessment",
        accountId: "acct_7f3a9c",
        assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        credentialId: "cred_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        riskVersion: 384185,
        reason: "Linked during review of the account evidence.",
        createdBy: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        createdAt: "2026-01-01T00:00:00Z",
      },
    ],
  },
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `headers`                                                       | Record<string, *string*[]>                                      | :heavy_check_mark:                                              | N/A                                                             |
| `result`                                                        | [models.ReviewSubjectList](../../models/review-subject-list.md) | :heavy_check_mark:                                              | N/A                                                             |