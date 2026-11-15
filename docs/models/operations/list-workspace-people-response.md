# ListWorkspacePeopleResponse

## Example Usage

```typescript
import { ListWorkspacePeopleResponse } from "@noresponse/node/models/operations";

let value: ListWorkspacePeopleResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    items: [
      {
        externalId: "case-person-1042",
        name: "Jordan Example",
        email: "jordan@example.com",
        phone: "+14155550100",
        company: "Example Ltd",
        city: "Melbourne",
        handles: [
          {
            platform: "bluesky",
            handle: "jordan_example",
          },
        ],
        id: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
        expiresAt: "2026-02-01T00:00:00Z",
      },
    ],
    hasMore: true,
    nextCursor: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `headers`                                                           | Record<string, *string*[]>                                          | :heavy_check_mark:                                                  | N/A                                                                 |
| `result`                                                            | [models.WorkspacePeopleList](../../models/workspace-people-list.md) | :heavy_check_mark:                                                  | N/A                                                                 |