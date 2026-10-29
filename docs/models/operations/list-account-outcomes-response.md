# ListAccountOutcomesResponse

## Example Usage

```typescript
import { ListAccountOutcomesResponse } from "@noresponse/node/models/operations";

let value: ListAccountOutcomesResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key1": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key2": [],
  },
  result: {
    accountId: "acct_7f3a9c",
    items: [
      {
        id: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        accountId: "acct_7f3a9c",
        outcome: "false_positive",
        supersedes: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        observedAt: "2026-01-01T00:00:00Z",
        receivedAt: "2026-01-01T00:00:00Z",
        expiresAt: "2026-01-02T00:00:00Z",
        externalRef: "case_123",
        actor: {
          type: "api_key",
          keyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
          externalUserId: "usr_customer_admin",
          consoleCredentialId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
          principalId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        },
        riskVersionBefore: 422694,
        riskVersion: 834394,
        effectiveOutcomeId: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      },
    ],
    nextCursor:
      "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
    effectiveOutcomeId: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `headers`                                                         | Record<string, *string*[]>                                        | :heavy_check_mark:                                                | N/A                                                               |
| `result`                                                          | [models.AccountOutcomePage](../../models/account-outcome-page.md) | :heavy_check_mark:                                                | N/A                                                               |