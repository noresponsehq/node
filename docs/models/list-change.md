# ListChange

A committed bulk list change and bounded notification progress, available while propagation is pending and for 24 hours after all propagation completes. References count an account once per changed list entry and are not unique accounts. No endpoint delivery or customer enforcement is implied by completed.

## Example Usage

```typescript
import { ListChange } from "@noresponse/node/models";

let value: ListChange = {
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
  pendingPropagations: 964550,
  processedAccountReferences: 864280,
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              | Example                                                  |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `id`                                                     | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      | lch_01JA2Z8K6Q4V7W9XBCDEFGHJKM                           |
| `createdAt`                                              | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      | 2026-01-01T00:00:00Z                                     |
| `state`                                                  | [models.ListChangeState](../models/list-change-state.md) | :heavy_check_mark:                                       | N/A                                                      |                                                          |
| `added`                                                  | [models.ListEntry](../models/list-entry.md)[]            | :heavy_check_mark:                                       | N/A                                                      |                                                          |
| `removed`                                                | *string*[]                                               | :heavy_check_mark:                                       | N/A                                                      |                                                          |
| `pendingPropagations`                                    | *number*                                                 | :heavy_check_mark:                                       | N/A                                                      |                                                          |
| `processedAccountReferences`                             | *number*                                                 | :heavy_check_mark:                                       | N/A                                                      |                                                          |