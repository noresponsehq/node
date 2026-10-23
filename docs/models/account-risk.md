# AccountRisk

## Example Usage

```typescript
import { AccountRisk } from "@noresponse/node/models";

let value: AccountRisk = {
  score: 518192,
  decision: "allow",
  reasons: [],
};
```

## Fields

| Field                                                                                                                                                     | Type                                                                                                                                                      | Required                                                                                                                                                  | Description                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `score`                                                                                                                                                   | *number*                                                                                                                                                  | :heavy_check_mark:                                                                                                                                        | 0 (safe) to 100 (risky), as risk.score of the assessment.                                                                                                 |
| `decision`                                                                                                                                                | [models.AccountDecision](../models/account-decision.md)                                                                                                   | :heavy_check_mark:                                                                                                                                        | block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it. |
| `reasons`                                                                                                                                                 | [models.AccountRiskReason](../models/account-risk-reason.md)[]                                                                                            | :heavy_check_mark:                                                                                                                                        | Every reason that fired, highest weight first. The weights sum to score before clamping.                                                                  |