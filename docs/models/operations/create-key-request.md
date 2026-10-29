# CreateKeyRequest

## Example Usage

```typescript
import { CreateKeyRequest } from "@noresponse/node/models/operations";

let value: CreateKeyRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {
    environment: "test",
    scopes: [],
    name: "Gateway production key",
    purpose: "Serve account creation checks",
    expiresAt: "2026-01-01T00:00:00Z",
    requestId: "issue_gateway_key_1",
  },
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                      | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404. | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `body`                                                                                                                             | [models.KeyRequest](../../models/key-request.md)                                                                                   | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                |                                                                                                                                    |