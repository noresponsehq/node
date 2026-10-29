# RemoveAuditStreamResponse

## Example Usage

```typescript
import { RemoveAuditStreamResponse } from "@noresponse/node/models/operations";

let value: RemoveAuditStreamResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
    "key2": [],
  },
  result: {
    items: [
      {
        endpointId: "whe_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        environment: "workspace",
        actions: [
          "policy.updated",
        ],
        createdAt: "2026-01-01T00:00:00Z",
        endpointState: "unverified",
        lastAttemptAt: "2026-01-01T00:00:00Z",
        lastDeliveredAt: "2026-01-01T00:00:00Z",
      },
    ],
  },
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `headers`                                                   | Record<string, *string*[]>                                  | :heavy_check_mark:                                          | N/A                                                         |
| `result`                                                    | [models.AuditStreamList](../../models/audit-stream-list.md) | :heavy_check_mark:                                          | N/A                                                         |