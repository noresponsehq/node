# Export

Retained review snapshot.

## Example Usage

```typescript
import { Export } from "@noresponse/node/models";

let value: Export = {
  exportedAt: "2026-01-01T00:00:00Z",
  review: {
    id: "rev_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    accountId: "acct_7f3a9c",
    status: "open",
    priority: "low",
    assignee: "usr_customer_admin",
    version: 269550,
    openedRiskVersion: 183205,
    currentRiskVersion: 260835,
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
  comments: [
    {
      id: "rvc_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      reviewVersion: 333473,
      body: "Reviewed the retained account evidence and customer report.",
      createdBy: "usr_customer_admin",
      createdAt: "2026-01-01T00:00:00Z",
    },
  ],
  resolutions: [],
  subjects: [],
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           | Example                                               |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `exportedAt`                                          | *string*                                              | :heavy_check_mark:                                    | N/A                                                   | 2026-01-01T00:00:00Z                                  |
| `review`                                              | [models.Review](../models/review.md)                  | :heavy_check_mark:                                    | N/A                                                   |                                                       |
| `comments`                                            | [models.ReviewComment](../models/review-comment.md)[] | :heavy_check_mark:                                    | N/A                                                   |                                                       |
| `resolutions`                                         | [models.Resolution](../models/resolution.md)[]        | :heavy_check_mark:                                    | N/A                                                   |                                                       |
| `subjects`                                            | [models.ReviewSubject](../models/review-subject.md)[] | :heavy_check_mark:                                    | N/A                                                   |                                                       |