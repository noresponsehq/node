# RecordKeyUsageRequest

## Example Usage

```typescript
import { RecordKeyUsageRequest } from "@noresponse/node/models/operations";

let value: RecordKeyUsageRequest = {
  idempotencyKey: "account-acct_7f3a9c",
  body: {
    events: [
      {
        keySha256:
          "2bdbf5c72f2a36df0ef40fb92203612274d4546f56dba946070a6a79c2401a1b",
        ip: "203.0.113.24",
        occurredAt: "2026-10-23T09:14:07.000Z",
        userAgent: "python-requests/2.32.3",
        model: "gpt-4o-mini",
      },
    ],
  },
};
```

## Fields

| Field                                                                                                                                                             | Type                                                                                                                                                              | Required                                                                                                                                                          | Description                                                                                                                                                       | Example                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idempotencyKey`                                                                                                                                                  | *string*                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                | Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours. | account-acct_7f3a9c                                                                                                                                               |
| `body`                                                                                                                                                            | [models.KeyUsageBatchRequest](../../models/key-usage-batch-request.md)                                                                                            | :heavy_check_mark:                                                                                                                                                | N/A                                                                                                                                                               |                                                                                                                                                                   |