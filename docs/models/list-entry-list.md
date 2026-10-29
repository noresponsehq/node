# ListEntryList

Newest first. Without a query, returns every active entry for compatibility. With limit or cursor, returns up to 100 entries and an authenticated workspace/environment-bound cursor. Expired entries are omitted.

## Example Usage

```typescript
import { ListEntryList } from "@noresponse/node/models";

let value: ListEntryList = {
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
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `items`                                                                    | [models.ListEntry](../models/list-entry.md)[]                              | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `nextCursor`                                                               | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ |