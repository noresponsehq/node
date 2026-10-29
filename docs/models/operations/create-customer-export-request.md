# CreateCustomerExportRequest

## Example Usage

```typescript
import { CreateCustomerExportRequest } from "@noresponse/node/models/operations";

let value: CreateCustomerExportRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  body: {
    kind: "account",
    environment: "live",
    accountId: "acct_7f3a9c",
    responseMode: "standard",
  },
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                      | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404. | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                     |
| `idempotencyKey`                                                                                                                   | *string*                                                                                                                           | :heavy_minus_sign:                                                                                                                 | N/A                                                                                                                                |                                                                                                                                    |
| `body`                                                                                                                             | [models.CustomerExportRequest](../../models/customer-export-request.md)                                                            | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                | {<br/>"kind": "account",<br/>"environment": "live",<br/>"account_id": "acct_7f3a9c",<br/>"response_mode": "standard"<br/>}         |