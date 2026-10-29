# ReviewSubjectList

Retained tenant-local subject links and the current review version.

## Example Usage

```typescript
import { ReviewSubjectList } from "@noresponse/node/models";

let value: ReviewSubjectList = {
  reviewVersion: 869456,
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
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `reviewVersion`                                       | *number*                                              | :heavy_check_mark:                                    | N/A                                                   |
| `items`                                               | [models.ReviewSubject](../models/review-subject.md)[] | :heavy_check_mark:                                    | N/A                                                   |