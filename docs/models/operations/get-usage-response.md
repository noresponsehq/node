# GetUsageResponse

## Example Usage

```typescript
import { GetUsageResponse } from "@noresponse/node/models/operations";

let value: GetUsageResponse = {
  headers: {},
  result: {
    workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    from: "2026-01-01",
    to: "2026-01-01",
    items: [],
    consoleLookups: {
      used: 177653,
      limit: 673493,
      resetsAt: "2026-01-02T00:00:00.000Z",
    },
  },
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `headers`                             | Record<string, *string*[]>            | :heavy_check_mark:                    | N/A                                   |
| `result`                              | [models.Usage](../../models/usage.md) | :heavy_check_mark:                    | N/A                                   |