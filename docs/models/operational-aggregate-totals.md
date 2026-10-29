# OperationalAggregateTotals

## Example Usage

```typescript
import { OperationalAggregateTotals } from "@noresponse/node/models";

let value: OperationalAggregateTotals = {
  attempts: 593486,
  succeeded: 405810,
  failed: 262029,
  clientErrors: 583969,
  serverErrors: 638471,
  replays: 826451,
  incompleteWrites: 437784,
  unattributedKeys: 418843,
};
```

## Fields

| Field                                                                                     | Type                                                                                      | Required                                                                                  | Description                                                                               |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `attempts`                                                                                | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |
| `succeeded`                                                                               | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |
| `failed`                                                                                  | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |
| `clientErrors`                                                                            | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |
| `serverErrors`                                                                            | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |
| `replays`                                                                                 | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |
| `incompleteWrites`                                                                        | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |
| `unattributedKeys`                                                                        | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |
| `p50Ms`                                                                                   | *number*                                                                                  | :heavy_minus_sign:                                                                        | Continuous percentile over retained attempts. Omitted when there are no captured samples. |
| `p95Ms`                                                                                   | *number*                                                                                  | :heavy_minus_sign:                                                                        | Continuous percentile over retained attempts. Omitted when there are no captured samples. |
| `p99Ms`                                                                                   | *number*                                                                                  | :heavy_minus_sign:                                                                        | Continuous percentile over retained attempts. Omitted when there are no captured samples. |