# ErasureReceiptTarget

## Example Usage

```typescript
import { ErasureReceiptTarget } from "@noresponse/node/models";

let value: ErasureReceiptTarget = {
  name: "downstream_projection",
  status: "pending",
  completedAt: "2026-01-01T00:00:00Z",
};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     | Example                                                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `name`                                                                          | [models.ErasureReceiptTargetName](../models/erasure-receipt-target-name.md)     | :heavy_check_mark:                                                              | N/A                                                                             |                                                                                 |
| `status`                                                                        | [models.ErasureReceiptTargetStatus](../models/erasure-receipt-target-status.md) | :heavy_check_mark:                                                              | N/A                                                                             |                                                                                 |
| `completedAt`                                                                   | *string*                                                                        | :heavy_minus_sign:                                                              | N/A                                                                             | 2026-01-01T00:00:00Z                                                            |