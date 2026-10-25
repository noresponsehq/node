# KeyList

GET /v1/workspaces/{workspace_id}/keys: the keys of both of the workspace's environments, newest first, at most 200 of each, revoked and expired keys included. No item carries a secret.

## Example Usage

```typescript
import { KeyList } from "@noresponse/node/models";

let value: KeyList = {
  items: [
    {
      id: "01JA2ZE4K5M6N7P8Q9R0S1T2V3",
      workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      environment: "test",
      prefix: "nrk_live_01JA2ZE4K5M6N7P8Q9R0S1T2V3",
      scopes: [
        "management",
      ],
      status: "expired",
      createdAt: "2026-10-23T09:14:12.000Z",
      createdBy: "nrk_live_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      expiresAt: "2026-10-24T09:14:12.000Z",
      revokedAt: "2026-10-25T09:14:12.000Z",
      revokedBy: "nrk_live_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      key:
        "nrk_live_01JA2ZE4K5M6N7P8Q9R0S1T2V3_N0tARealSecretJustTheShapeOfOneAAAAAAAAAAAA",
    },
  ],
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `items`                          | [models.Key](../models/key.md)[] | :heavy_check_mark:               | N/A                              |