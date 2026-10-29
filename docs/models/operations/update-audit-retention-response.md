# UpdateAuditRetentionResponse

## Example Usage

```typescript
import { UpdateAuditRetentionResponse } from "@noresponse/node/models/operations";

let value: UpdateAuditRetentionResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    environment: "live",
    retentionDays: 198361,
    oldestAvailableAt: "2026-01-01T00:00:00Z",
    capture: "available_events_only",
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `headers`                                              | Record<string, *string*[]>                             | :heavy_check_mark:                                     | N/A                                                    |
| `result`                                               | [models.AuditSettings](../../models/audit-settings.md) | :heavy_check_mark:                                     | N/A                                                    |