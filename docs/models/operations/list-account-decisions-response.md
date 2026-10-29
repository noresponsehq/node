# ListAccountDecisionsResponse

## Example Usage

```typescript
import { ListAccountDecisionsResponse } from "@noresponse/node/models/operations";

let value: ListAccountDecisionsResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    accountId: "acct_7f3a9c",
    items: [
      {
        account: {
          schemaVersion: "1",
          id: "acct_7f3a9c",
          risk: {
            score: 557856,
            decision: "step_up",
            reasons: [
              {
                code: "no_digital_footprint",
                direction: "neutral",
                impact: "medium",
                listEntryId: "lst_01JA2ZE4K5M6N7P8Q9R0S1T2V3",
              },
            ],
          },
          decisionsByFlow: {
            accountCreation: "block",
            login: "allow",
            purchase: "held",
          },
          assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
          updatedAt: "2026-10-14T09:00:00.412Z",
          riskVersion: 698486,
        },
        assessmentVersion: 389376,
        policyVersion: "risk-2026-10.17+t1",
        overlayVersion: 1,
        changedAt: "2026-01-01T00:00:00Z",
        feedbackOutcomeId: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      },
    ],
    nextCursor:
      "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
  },
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `headers`                                                           | Record<string, *string*[]>                                          | :heavy_check_mark:                                                  | N/A                                                                 |
| `result`                                                            | [models.AccountDecisionList](../../models/account-decision-list.md) | :heavy_check_mark:                                                  | N/A                                                                 |