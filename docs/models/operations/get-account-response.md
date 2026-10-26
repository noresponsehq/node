# GetAccountResponse

## Example Usage

```typescript
import { GetAccountResponse } from "@noresponse/node/models/operations";

let value: GetAccountResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
  },
  result: {
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
    riskVersion: 262679,
  },
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `headers`                                 | Record<string, *string*[]>                | :heavy_check_mark:                        | N/A                                       |
| `result`                                  | [models.Account](../../models/account.md) | :heavy_check_mark:                        | N/A                                       |