# PolicyEvaluationRequestCosts

## Example Usage

```typescript
import { PolicyEvaluationRequestCosts } from "@noresponse/node/models";

let value: PolicyEvaluationRequestCosts = {
  legitimate: {
    allow: 7530.58,
    stepUp: 4910.24,
    review: 2661.77,
    block: 5992.19,
  },
  abuse: {
    allow: 8314.74,
    stepUp: 6595.2,
    review: 7530.73,
    block: 424.61,
  },
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `legitimate`                     | [models.Cost](../models/cost.md) | :heavy_check_mark:               | N/A                              |
| `abuse`                          | [models.Cost](../models/cost.md) | :heavy_check_mark:               | N/A                              |