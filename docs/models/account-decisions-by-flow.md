# AccountDecisionsByFlow

The decision for each flow. Every flow uses the tenant's signup thresholds today, so all three are equal.

## Example Usage

```typescript
import { AccountDecisionsByFlow } from "@noresponse/node/models";

let value: AccountDecisionsByFlow = {
  signup: "block",
  login: "step_up",
  purchase: "allow",
};
```

## Fields

| Field                                                                                                                                                     | Type                                                                                                                                                      | Required                                                                                                                                                  | Description                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `signup`                                                                                                                                                  | [models.AccountDecision](../models/account-decision.md)                                                                                                   | :heavy_check_mark:                                                                                                                                        | block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it. |
| `login`                                                                                                                                                   | [models.AccountDecision](../models/account-decision.md)                                                                                                   | :heavy_check_mark:                                                                                                                                        | block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it. |
| `purchase`                                                                                                                                                | [models.AccountDecision](../models/account-decision.md)                                                                                                   | :heavy_check_mark:                                                                                                                                        | block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it. |