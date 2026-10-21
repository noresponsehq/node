# RotateApiKeyResponse

## Example Usage

```typescript
import { RotateApiKeyResponse } from "@noresponse/node/models/operations";

let value: RotateApiKeyResponse = {
  headers: {},
  result: {
    key: "<key>",
    keyId: "<id>",
    scopes: [
      "history",
    ],
    createdAt: "1715554216932",
    previousKeyId: "<id>",
    previousKeyExpiresAt: "<value>",
  },
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `headers`                                          | Record<string, *string*[]>                         | :heavy_check_mark:                                 | N/A                                                |
| `result`                                           | [models.KeyRotation](../../models/key-rotation.md) | :heavy_check_mark:                                 | N/A                                                |