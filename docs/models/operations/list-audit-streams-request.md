# ListAuditStreamsRequest

## Example Usage

```typescript
import { ListAuditStreamsRequest } from "@noresponse/node/models/operations";

let value: ListAuditStreamsRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  environment: "test",
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                      | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404. | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `environment`                                                                                                                      | [models.Environment](../../models/environment.md)                                                                                  | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                |                                                                                                                                    |