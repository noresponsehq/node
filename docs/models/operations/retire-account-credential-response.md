# RetireAccountCredentialResponse

## Example Usage

```typescript
import { RetireAccountCredentialResponse } from "@noresponse/node/models/operations";

let value: RetireAccountCredentialResponse = {
  headers: {},
  result: {
    id: "cred_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    accountId: "acct_7f3a9c",
    createdAt: "2026-01-01T00:00:00Z",
    retiredAt: "2026-01-01T00:00:00Z",
    actor: {
      type: "api_key",
      keyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    },
    retiredBy: {
      type: "api_key",
      keyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    },
  },
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `headers`                                                              | Record<string, *string*[]>                                             | :heavy_check_mark:                                                     | N/A                                                                    |
| `result`                                                               | [models.CredentialAssociation](../../models/credential-association.md) | :heavy_check_mark:                                                     | N/A                                                                    |