# GetAccountResponse

## Example Usage

```typescript
import { GetAccountResponse } from "@noresponse/node/models/operations";

let value: GetAccountResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [],
  },
  result: {
    schemaVersion: "1",
    id: "acct_7f3a9c",
    risk: {
      score: 262679,
      decision: "step_up",
      reasons: [
        {
          code: "bot_or_automation",
          weight: 401478,
        },
      ],
    },
    decisionsByFlow: {
      signup: "step_up",
      login: "step_up",
      purchase: "block",
    },
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    updatedAt: "2026-10-14T09:00:00.412Z",
  },
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `headers`                                 | Record<string, *string*[]>                | :heavy_check_mark:                        | N/A                                       |
| `result`                                  | [models.Account](../../models/account.md) | :heavy_check_mark:                        | N/A                                       |