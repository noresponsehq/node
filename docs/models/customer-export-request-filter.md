# CustomerExportRequestFilter

## Example Usage

```typescript
import { CustomerExportRequestFilter } from "@noresponse/node/models";

let value: CustomerExportRequestFilter = {
  action: "policy.updated",
  actor: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  targetType: "setting",
  targetId: "policy",
  since: "2026-01-01T00:00:00Z",
  until: "2026-01-02T00:00:00Z",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `action`                                                                                         | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              | policy.updated                                                                                   |
| `actor`                                                                                          | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              | mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                   |
| `targetType`                                                                                     | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              | setting                                                                                          |
| `targetId`                                                                                       | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              | policy                                                                                           |
| `environment`                                                                                    | [models.Environment](../models/environment.md)                                                   | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |
| `outcome`                                                                                        | [models.CustomerExportRequestFilterOutcome](../models/customer-export-request-filter-outcome.md) | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |
| `since`                                                                                          | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              | 2026-01-01T00:00:00Z                                                                             |
| `until`                                                                                          | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              | 2026-01-02T00:00:00Z                                                                             |