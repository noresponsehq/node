# Enforcements

Retained customer enforcement report rows created in [from,to), one row per account/risk_version/flow/action. A later applied report can replace failed at the original created_at; retries are not additional attempts here. applied_coverage divides reported_applied by report rows, including explicit action none; it is not independently verified execution, all requested actions, or prevented fraud. Unreported actions are unknown.

## Example Usage

```typescript
import { Enforcements } from "@noresponse/node/models";

let value: Enforcements = {
  population: "retained_enforcement_reports_by_created_at",
  denominator: 79839,
  accounts: 792556,
  reportedApplied: 881272,
  reportedFailed: 887879,
  appliedCoverage: {
    numerator: 662613,
    denominator: 452034,
  },
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `population`                                                                                       | *"retained_enforcement_reports_by_created_at"*                                                     | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `denominator`                                                                                      | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `accounts`                                                                                         | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `reportedApplied`                                                                                  | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `reportedFailed`                                                                                   | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `appliedCoverage`                                                                                  | [models.Coverage](../models/coverage.md)                                                           | :heavy_check_mark:                                                                                 | Counts only; a zero denominator means no eligible retained records and does not imply a zero rate. |