# ListListEntriesResponse

## Example Usage

```typescript
import { ListListEntriesResponse } from "@noresponse/node/models/operations";

let value: ListListEntriesResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    items: [
      {
        id: "lst_01JA2ZE4K5M6N7P8Q9R0S1T2V3",
        workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        environment: "live",
        kind: "email_domain",
        value: "throwaway.example",
        action: "block",
        note: "Signup burst from one domain",
        createdAt: "2026-10-23T09:14:12.000Z",
        createdBy: "nrk_live_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        expiresAt: "2026-01-01T00:00:00Z",
      },
    ],
    nextCursor:
      "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
  },
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `headers`                                               | Record<string, *string*[]>                              | :heavy_check_mark:                                      | N/A                                                     |
| `result`                                                | [models.ListEntryList](../../models/list-entry-list.md) | :heavy_check_mark:                                      | N/A                                                     |