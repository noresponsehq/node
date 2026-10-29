# GetErasureReceiptResponse

## Example Usage

```typescript
import { GetErasureReceiptResponse } from "@noresponse/node/models/operations";

let value: GetErasureReceiptResponse = {
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
    ],
  },
  result: {
    id: "0123456789abcdef0123456789abcdef",
    kind: "account",
    status: "completed",
    assessmentsDeleted: 566052,
    requestedAt: "2026-01-01T00:00:00Z",
    completedAt: "2026-01-01T00:00:00Z",
    targets: [
      {
        name: "downstream_projection",
        status: "pending",
        completedAt: "2026-01-01T00:00:00Z",
      },
    ],
    backupPolicy:
      "Backups expire under the documented backup retention policy.",
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `headers`                                                | Record<string, *string*[]>                               | :heavy_check_mark:                                       | N/A                                                      |
| `result`                                                 | [models.ErasureReceipt](../../models/erasure-receipt.md) | :heavy_check_mark:                                       | N/A                                                      |