# ListBulkRequest

At most 100 additions and removals combined. One transaction applies all changes or none. Idempotency-Key prevents duplicate changes for 24 hours; a different body under the same key returns 409. Matching reads see the new list immediately, while bounded durable jobs propagate account risk notifications.

## Example Usage

```typescript
import { ListBulkRequest } from "@noresponse/node/models";

let value: ListBulkRequest = {
  add: [
    {
      kind: "email",
      value: "throwaway.example",
      action: "allow",
      note: "Signup burst from one domain",
      expiresAt: "2026-01-01T00:00:00Z",
    },
  ],
  remove: [
    "lst_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  ],
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `add`                                                        | [models.ListEntryRequest](../models/list-entry-request.md)[] | :heavy_minus_sign:                                           | N/A                                                          |
| `remove`                                                     | *string*[]                                                   | :heavy_minus_sign:                                           | N/A                                                          |