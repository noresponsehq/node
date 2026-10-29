# UpdateAuditRetentionRequest

## Example Usage

```typescript
import { UpdateAuditRetentionRequest } from "@noresponse/node/models/operations";

let value: UpdateAuditRetentionRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  environment: "test",
  body: {
    retentionDays: 929363,
  },
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                      | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404. | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `environment`                                                                                                                      | [operations.Environment](../../models/operations/environment.md)                                                                   | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                | test                                                                                                                               |
| `body`                                                                                                                             | [models.AuditSettingsRequest](../../models/audit-settings-request.md)                                                              | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                |                                                                                                                                    |