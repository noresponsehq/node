# ErasureReceipt

Acknowledged propagation of a retained erasure record in the calling environment. Pending means the target has not acknowledged completion. Completion covers these serving-system targets only; backup and point-in-time recovery copies expire according to their own retention policy. This receipt contains no subject id or digest. Workspace teardown revokes customer credentials, so obtain required receipts before teardown.

## Example Usage

```typescript
import { ErasureReceipt } from "@noresponse/node/models";

let value: ErasureReceipt = {
  id: "0123456789abcdef0123456789abcdef",
  kind: "assessment",
  status: "propagating",
  assessmentsDeleted: 480624,
  requestedAt: "2026-01-01T00:00:00Z",
  completedAt: "2026-01-01T00:00:00Z",
  targets: [],
  backupPolicy: "Backups expire under the documented backup retention policy.",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  | Example                                                                      |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `id`                                                                         | *string*                                                                     | :heavy_check_mark:                                                           | Opaque, server-issued erasure receipt id. It contains no subject identifier. | 0123456789abcdef0123456789abcdef                                             |
| `kind`                                                                       | [models.ErasureReceiptKind](../models/erasure-receipt-kind.md)               | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `status`                                                                     | [models.ListChangeState](../models/list-change-state.md)                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `assessmentsDeleted`                                                         | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `requestedAt`                                                                | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          | 2026-01-01T00:00:00Z                                                         |
| `completedAt`                                                                | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          | 2026-01-01T00:00:00Z                                                         |
| `targets`                                                                    | [models.ErasureReceiptTarget](../models/erasure-receipt-target.md)[]         | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `backupPolicy`                                                               | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          | Backups expire under the documented backup retention policy.                 |