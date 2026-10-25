# RevokeKeyResponse

## Example Usage

```typescript
import { RevokeKeyResponse } from "@noresponse/node/models/operations";

let value: RevokeKeyResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [],
    "key2": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    id: "01JA2ZE4K5M6N7P8Q9R0S1T2V3",
    workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    environment: "live",
    prefix: "nrk_live_01JA2ZE4K5M6N7P8Q9R0S1T2V3",
    scopes: [
      "history",
    ],
    status: "revoked",
    createdAt: "2026-10-23T09:14:12.000Z",
    createdBy: "nrk_live_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    expiresAt: "2026-10-24T09:14:12.000Z",
    revokedAt: "2026-10-25T09:14:12.000Z",
    revokedBy: "nrk_live_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    key:
      "nrk_live_01JA2ZE4K5M6N7P8Q9R0S1T2V3_N0tARealSecretJustTheShapeOfOneAAAAAAAAAAAA",
  },
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `headers`                         | Record<string, *string*[]>        | :heavy_check_mark:                | N/A                               |
| `result`                          | [models.Key](../../models/key.md) | :heavy_check_mark:                | N/A                               |