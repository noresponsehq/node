# BindProvisionalAccountResponse

## Example Usage

```typescript
import { BindProvisionalAccountResponse } from "@noresponse/node/models/operations";

let value: BindProvisionalAccountResponse = {
  headers: {},
  result: {
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    provisionalAccountId: "pre:asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    accountId: "acct_7f3a9c",
    assessmentVersion: 571738,
    createdAt: "2026-01-01T00:00:00Z",
    actor: {
      type: "api_key",
      keyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    },
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `headers`                                                | Record<string, *string*[]>                               | :heavy_check_mark:                                       | N/A                                                      |
| `result`                                                 | [models.AccountBinding](../../models/account-binding.md) | :heavy_check_mark:                                       | N/A                                                      |