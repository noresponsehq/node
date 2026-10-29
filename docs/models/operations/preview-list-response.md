# PreviewListResponse

## Example Usage

```typescript
import { PreviewListResponse } from "@noresponse/node/models/operations";

let value: PreviewListResponse = {
  headers: {},
  result: {
    scope: "current_list_override_inputs",
    kind: "email_domain",
    value: "example.com",
    action: "block",
    remove: "lst_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    matchedAccounts: 911349,
    changedOverrides: 227032,
    truncated: true,
    historicalPopulationKnown: false,
    transitions: [],
  },
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `headers`                                        | Record<string, *string*[]>                       | :heavy_check_mark:                               | N/A                                              |
| `result`                                         | [models.ListImpact](../../models/list-impact.md) | :heavy_check_mark:                               | N/A                                              |