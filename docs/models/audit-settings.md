# AuditSettings

Read audit retention and available history.

## Example Usage

```typescript
import { AuditSettings } from "@noresponse/node/models";

let value: AuditSettings = {
  environment: "live",
  retentionDays: 120957,
  oldestAvailableAt: "2026-01-01T00:00:00Z",
  capture: "available_events_only",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `environment`                                                              | [models.AuditSettingsEnvironment](../models/audit-settings-environment.md) | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `retentionDays`                                                            | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `oldestAvailableAt`                                                        | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | 2026-01-01T00:00:00Z                                                       |
| `capture`                                                                  | *"available_events_only"*                                                  | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |