# ChangeListsRequest

## Example Usage

```typescript
import { ChangeListsRequest } from "@noresponse/node/models/operations";

let value: ChangeListsRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  environment: "live",
  idempotencyKey: "account-acct_7f3a9c",
  body: {
    add: [
      {
        kind: "email",
        value: "throwaway.example",
        action: "allow",
        note: "Signup burst from one domain",
        expiresAt: "2026-01-01T00:00:00Z",
      },
    ],
    remove: [
      "lst_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    ],
  },
};
```

## Fields

| Field                                                                                                                                                                  | Type                                                                                                                                                                   | Required                                                                                                                                                               | Description                                                                                                                                                            | Example                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                                                          | *string*                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                     | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.                                     | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                         |
| `environment`                                                                                                                                                          | [models.KeyEnvironment](../../models/key-environment.md)                                                                                                               | :heavy_check_mark:                                                                                                                                                     | The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404. |                                                                                                                                                                        |
| `idempotencyKey`                                                                                                                                                       | *string*                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                     | Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours.      | account-acct_7f3a9c                                                                                                                                                    |
| `body`                                                                                                                                                                 | [models.ListBulkRequest](../../models/list-bulk-request.md)                                                                                                            | :heavy_check_mark:                                                                                                                                                     | N/A                                                                                                                                                                    |                                                                                                                                                                        |