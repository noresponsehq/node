# ExportReviewResponse

## Example Usage

```typescript
import { ExportReviewResponse } from "@noresponse/node/models/operations";

let value: ExportReviewResponse = {
  headers: {
    "key": [],
    "key1": [
      "example 1",
    ],
    "key2": [],
  },
  result: {
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
    resolutions: [
      {
        reviewVersion: 598735,
        riskVersion: 156076,
        assessmentVersion: 735375,
        assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        conclusion: "abuse",
        note: "Reviewed the retained account evidence and customer report.",
        createdBy: "usr_customer_admin",
        createdAt: "2026-01-01T00:00:00Z",
      },
    ],
    subjects: [
      {
        id: "rvs_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        kind: "account",
        accountId: "acct_7f3a9c",
        assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        credentialId: "cred_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        riskVersion: 847586,
        reason: "Linked during review of the account evidence.",
        createdBy: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        createdAt: "2026-01-01T00:00:00Z",
      },
    ],
  },
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `headers`                               | Record<string, *string*[]>              | :heavy_check_mark:                      | N/A                                     |
| `result`                                | [models.Export](../../models/export.md) | :heavy_check_mark:                      | N/A                                     |