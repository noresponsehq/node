# SummarizeWorkspaceOperationsResponse

## Example Usage

```typescript
import { SummarizeWorkspaceOperationsResponse } from "@noresponse/node/models/operations";

let value: SummarizeWorkspaceOperationsResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [
      "example 1",
    ],
    "key2": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    environment: "live",
    from: "2026-01-01T00:00:00Z",
    to: "2026-01-02T00:00:00Z",
    asOf: "2026-01-02T01:00:00Z",
    retainedFrom: "2025-12-01T00:00:00Z",
    retentionDays: 937565,
    rowBudget: 100000,
    recordsRead: 246607,
    truncated: false,
    outcomes: {
      population: "retained_current_accounts_by_current_assessment_created_at",
      denominator: 920676,
      reported: 781648,
      unreported: 434862,
      labelCoverage: {
        numerator: 508522,
        denominator: 469340,
      },
      byOutcome: {},
    },
    enforcements: {
      population: "retained_enforcement_reports_by_created_at",
      denominator: 379768,
      accounts: 644526,
      reportedApplied: 342429,
      reportedFailed: 108967,
      appliedCoverage: {
        numerator: 662613,
        denominator: 452034,
      },
    },
    reviews: {
      population: "retained_reviews_by_created_at",
      denominator: 217212,
      open: 242333,
      inProgress: 851569,
      resolved: 385558,
      assigned: 292687,
      unassigned: 936555,
      labelCoverage: {
        numerator: 508522,
        denominator: 469340,
      },
      conclusions: {},
    },
  },
};
```

## Fields

| Field                                                                             | Type                                                                              | Required                                                                          | Description                                                                       |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `headers`                                                                         | Record<string, *string*[]>                                                        | :heavy_check_mark:                                                                | N/A                                                                               |
| `result`                                                                          | [models.WorkspaceOperationsSummary](../../models/workspace-operations-summary.md) | :heavy_check_mark:                                                                | N/A                                                                               |