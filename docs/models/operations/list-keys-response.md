# ListKeysResponse

## Example Usage

```typescript
import { ListKeysResponse } from "@noresponse/node/models/operations";

let value: ListKeysResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
    "key2": [
      "example 1",
      "example 2",
      "example 3",
    ],
  },
  result: {
    items: [
      {
        id: "01JA2ZE4K5M6N7P8Q9R0S1T2V3",
        workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        environment: "test",
        prefix: "nrk_live_01JA2ZE4K5M6N7P8Q9R0S1T2V3",
        scopes: [
          "members",
        ],
        status: "expired",
        createdAt: "2026-10-23T09:14:12.000Z",
        createdBy: "nrk_live_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        expiresAt: "2026-10-24T09:14:12.000Z",
        revokedAt: "2026-10-25T09:14:12.000Z",
        revokedBy: "nrk_live_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        key:
          "nrk_live_01JA2ZE4K5M6N7P8Q9R0S1T2V3_N0tARealSecretJustTheShapeOfOneAAAAAAAAAAAA",
        name: "Gateway production key",
        purpose: "Serve account creation checks",
        ownerUserId: "usr_customer_admin",
        rotatedTo: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        lastUsedAt: "2026-10-23T09:30:00.000Z",
      },
    ],
  },
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `headers`                                  | Record<string, *string*[]>                 | :heavy_check_mark:                         | N/A                                        |
| `result`                                   | [models.KeyList](../../models/key-list.md) | :heavy_check_mark:                         | N/A                                        |