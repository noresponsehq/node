# ListAccountCredentialsResponse

## Example Usage

```typescript
import { ListAccountCredentialsResponse } from "@noresponse/node/models/operations";

let value: ListAccountCredentialsResponse = {
  headers: {
    "key": [],
    "key1": [
      "example 1",
    ],
  },
  result: {
    accountId: "acct_7f3a9c",
    items: [
      {
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
    ],
    nextCursor:
      "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `headers`                                                | Record<string, *string*[]>                               | :heavy_check_mark:                                       | N/A                                                      |
| `result`                                                 | [models.CredentialPage](../../models/credential-page.md) | :heavy_check_mark:                                       | N/A                                                      |