# ListImpact

List override changes among the newest 5000 matching accounts. These counts describe override inputs. Customer enforcement and eventual outcomes remain separate. The response reports whether the matching population was truncated.

## Example Usage

```typescript
import { ListImpact } from "@noresponse/node/models";

let value: ListImpact = {
  scope: "current_list_override_inputs",
  kind: "email",
  value: "example.com",
  action: "block",
  remove: "lst_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  matchedAccounts: 202092,
  changedOverrides: 963188,
  truncated: true,
  historicalPopulationKnown: false,
  transitions: [
    {
      from: "none",
      to: "none",
      count: 990851,
    },
  ],
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          | Example                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `scope`                                                              | *"current_list_override_inputs"*                                     | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |
| `kind`                                                               | [models.ListImpactKind](../models/list-impact-kind.md)               | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |
| `value`                                                              | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  | example.com                                                          |
| `action`                                                             | [models.Action](../models/action.md)                                 | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |
| `remove`                                                             | *string*                                                             | :heavy_minus_sign:                                                   | N/A                                                                  | lst_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                       |
| `matchedAccounts`                                                    | *number*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |
| `changedOverrides`                                                   | *number*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |
| `truncated`                                                          | *boolean*                                                            | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |
| `historicalPopulationKnown`                                          | *false*                                                              | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |
| `transitions`                                                        | [models.ListImpactTransition](../models/list-impact-transition.md)[] | :heavy_check_mark:                                                   | N/A                                                                  |                                                                      |