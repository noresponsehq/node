# RecordAccountOutcomeResponse

## Example Usage

```typescript
import { RecordAccountOutcomeResponse } from "@noresponse/node/models/operations";

let value: RecordAccountOutcomeResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key1": [],
    "key2": [
      "example 1",
    ],
  },
  result: {
    id: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    accountId: "acct_7f3a9c",
    outcome: "chargeback",
    supersedes: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    observedAt: "2026-01-01T00:00:00Z",
    receivedAt: "2026-01-01T00:00:00Z",
    expiresAt: "2026-01-02T00:00:00Z",
    externalRef: "case_123",
    actor: {
      type: "api_key",
      keyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    },
    riskVersionBefore: 29024,
    riskVersion: 843280,
    effectiveOutcomeId: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `headers`                                                | Record<string, *string*[]>                               | :heavy_check_mark:                                       | N/A                                                      |
| `result`                                                 | [models.AccountOutcome](../../models/account-outcome.md) | :heavy_check_mark:                                       | N/A                                                      |