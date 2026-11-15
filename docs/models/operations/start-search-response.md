# StartSearchResponse

## Example Usage

```typescript
import { StartSearchResponse } from "@noresponse/node/models/operations";

let value: StartSearchResponse = {
  headers: {
    "key": [],
  },
  result: {
    searchId: "srh_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    recordId: "rec_3f9a1c22d4e5b6a73f9a1c22d4e5b6a7",
    field: "username",
    table: "FORUM_EXAMPLE_COM_2019",
    kind: "ip",
    value: "jordanexample42",
    status: "queued",
    sources: 550772,
    answered: 911893,
    found: 363214,
    estimatedSpend: 446142,
    spent: 584601,
    requestedBy: "user_2abc",
    createdAt: "2026-01-01T00:00:00Z",
    finishedAt: "2026-01-01T00:00:05Z",
  },
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `headers`                               | Record<string, *string*[]>              | :heavy_check_mark:                      | N/A                                     |
| `result`                                | [models.Search](../../models/search.md) | :heavy_check_mark:                      | N/A                                     |