# WorkspaceOperationsSummaryRequest

Read a past [from,to) interval of at most 31 days. The complete retained populations must fit a combined 100000-row budget and a 1500ms SQL statement budget. No pagination or sampled totals; choose a shorter interval after a row-budget refusal.

## Example Usage

```typescript
import { WorkspaceOperationsSummaryRequest } from "@noresponse/node/models";

let value: WorkspaceOperationsSummaryRequest = {
  environment: "live",
  from: "2026-01-01T00:00:00Z",
  to: "2026-01-02T00:00:00Z",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `environment`                                                              | [models.AuditSettingsEnvironment](../models/audit-settings-environment.md) | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `from`                                                                     | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        | 2026-01-01T00:00:00Z                                                       |
| `to`                                                                       | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        | 2026-01-02T00:00:00Z                                                       |