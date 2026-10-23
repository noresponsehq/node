# AccountDecisionsByFlow

The decision for each flow: the account's score under that flow's thresholds. A flow the workspace has not set uses its signup thresholds, so the flows differ only where it set them.

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