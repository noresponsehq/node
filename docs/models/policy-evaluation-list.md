# PolicyEvaluationList

Retained jobs, newest first. Follow next_before for another page.

## Example Usage

```typescript
import { PolicyEvaluationList } from "@noresponse/node/models";

let value: PolicyEvaluationList = {
  items: [],
  nextBefore: "pev_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 | Example                                                     |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `items`                                                     | [models.PolicyEvaluation](../models/policy-evaluation.md)[] | :heavy_check_mark:                                          | N/A                                                         |                                                             |
| `nextBefore`                                                | *string*                                                    | :heavy_minus_sign:                                          | N/A                                                         | pev_01JA2Z8K6Q4V7W9XBCDEFGHJKM                              |