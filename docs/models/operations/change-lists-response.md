# ChangeListsResponse

## Example Usage

```typescript
import { ChangeListsResponse } from "@noresponse/node/models/operations";

let value: ChangeListsResponse = {
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
  },
  result: {
    id: "lch_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    createdAt: "2026-01-01T00:00:00Z",
    state: "completed",
    added: [
      {
        id: "lst_01JA2ZE4K5M6N7P8Q9R0S1T2V3",
        workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        environment: "test",
        kind: "email",
        value: "throwaway.example",
        action: "allow",
        note: "Signup burst from one domain",
        createdAt: "2026-10-23T09:14:12.000Z",
        createdBy: "nrk_live_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        expiresAt: "2026-01-01T00:00:00Z",
      },
    ],
    removed: [
      "lst_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    ],
    pendingPropagations: 940050,
    processedAccountReferences: 564115,
  },
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `headers`                                        | Record<string, *string*[]>                       | :heavy_check_mark:                               | N/A                                              |
| `result`                                         | [models.ListChange](../../models/list-change.md) | :heavy_check_mark:                               | N/A                                              |