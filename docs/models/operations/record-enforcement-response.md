# RecordEnforcementResponse

## Example Usage

```typescript
import { RecordEnforcementResponse } from "@noresponse/node/models/operations";

let value: RecordEnforcementResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [],
  },
  result: {
    id: "enf_01JA2ZF5N6P7Q8R9S0T1V2W3X4",
    accountId: "acct_7f3a9c",
    riskVersion: 504880,
    flow: "account_creation",
    action: "unrestrict",
    stateBefore: "provisional",
    status: "failed",
    provider: "clerk",
    errorCode: "clerk.rate_limited",
    createdAt: "2026-10-14T09:00:02.000Z",
  },
};
```

## Fields

| Field                                             | Type                                              | Required                                          | Description                                       |
| ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `headers`                                         | Record<string, *string*[]>                        | :heavy_check_mark:                                | N/A                                               |
| `result`                                          | [models.Enforcement](../../models/enforcement.md) | :heavy_check_mark:                                | N/A                                               |