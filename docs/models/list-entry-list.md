# ListEntryList

GET /v1/workspaces/{workspace_id}/lists/{environment}: every entry of the environment's list, newest first. An environment holds at most 10,000 entries.

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
    },
  ],
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `items`                                       | [models.ListEntry](../models/list-entry.md)[] | :heavy_check_mark:                            | N/A                                           |