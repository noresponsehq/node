# RotateApiKeyResponse

## Example Usage

```typescript
import { RotateApiKeyResponse } from "@noresponse/node/models/operations";

let value: RotateApiKeyResponse = {
  headers: {
    "key": [],
  },
  result: {
    key:
      "nrk_01JA2Z8K6Q4V7W9XBCDEFGHJKM_k3Yx8pQ2mN7vR4tW6zB9cD1eF5gH0jL4sP9uV2wX7yA",
    keyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    scopes: [
      "history",
    ],
    createdAt: "2026-10-14T09:10:00.000Z",
    previousKeyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKN",
    previousKeyExpiresAt: "2026-10-15T09:10:00.000Z",
  },
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `headers`                                          | Record<string, *string*[]>                         | :heavy_check_mark:                                 | N/A                                                |
| `result`                                           | [models.KeyRotation](../../models/key-rotation.md) | :heavy_check_mark:                                 | N/A                                                |