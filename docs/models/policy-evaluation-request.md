# PolicyEvaluationRequest

## Example Usage

```typescript
import { PolicyEvaluationRequest } from "@noresponse/node/models";

let value: PolicyEvaluationRequest = {
  expectedPolicyVersion: 131766,
  from: "2026-01-01T00:00:00Z",
  to: "2026-01-02T00:00:00Z",
  candidates: [
    {
      stepUp: 351645,
      review: 222859,
      block: 178058,
    },
  ],
  costs: {
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
  },
  limits: {
    reviewRate: 4578.36,
    serverErrorRate: 7206.96,
    unavailableResultRate: 3724.79,
    p95Ms: 5013.51,
  },
  labelCollection:
    "Customer support reviewed the outcome labels for the selected cohort.",
  splitSeed: "reviewed-cohort-seed-01",
};
```

## Fields

| Field                                                                                 | Type                                                                                  | Required                                                                              | Description                                                                           | Example                                                                               |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `expectedPolicyVersion`                                                               | *number*                                                                              | :heavy_check_mark:                                                                    | N/A                                                                                   |                                                                                       |
| `from`                                                                                | *string*                                                                              | :heavy_check_mark:                                                                    | N/A                                                                                   | 2026-01-01T00:00:00Z                                                                  |
| `to`                                                                                  | *string*                                                                              | :heavy_check_mark:                                                                    | N/A                                                                                   | 2026-01-02T00:00:00Z                                                                  |
| `candidates`                                                                          | [models.Thresholds](../models/thresholds.md)[]                                        | :heavy_check_mark:                                                                    | N/A                                                                                   |                                                                                       |
| `costs`                                                                               | [models.PolicyEvaluationRequestCosts](../models/policy-evaluation-request-costs.md)   | :heavy_check_mark:                                                                    | N/A                                                                                   |                                                                                       |
| `limits`                                                                              | [models.PolicyEvaluationRequestLimits](../models/policy-evaluation-request-limits.md) | :heavy_check_mark:                                                                    | N/A                                                                                   |                                                                                       |
| `labelCollection`                                                                     | *string*                                                                              | :heavy_check_mark:                                                                    | N/A                                                                                   | Customer support reviewed the outcome labels for the selected cohort.                 |
| `splitSeed`                                                                           | *string*                                                                              | :heavy_check_mark:                                                                    | N/A                                                                                   | reviewed-cohort-seed-01                                                               |