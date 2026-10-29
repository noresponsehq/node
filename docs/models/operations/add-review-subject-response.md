# AddReviewSubjectResponse

## Example Usage

```typescript
import { AddReviewSubjectResponse } from "@noresponse/node/models/operations";

let value: AddReviewSubjectResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    reviewVersion: 435902,
    subject: {
      id: "rvs_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      kind: "assessment",
      accountId: "acct_7f3a9c",
      assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      credentialId: "cred_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      riskVersion: 151796,
      reason: "Linked during review of the account evidence.",
      createdBy: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      createdAt: "2026-01-01T00:00:00Z",
    },
  },
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `headers`                                                           | Record<string, *string*[]>                                          | :heavy_check_mark:                                                  | N/A                                                                 |
| `result`                                                            | [models.ReviewSubjectChange](../../models/review-subject-change.md) | :heavy_check_mark:                                                  | N/A                                                                 |