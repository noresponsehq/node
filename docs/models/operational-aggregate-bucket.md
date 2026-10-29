# OperationalAggregateBucket

## Example Usage

```typescript
import { OperationalAggregateBucket } from "@noresponse/node/models";

let value: OperationalAggregateBucket = {
  start: "2026-01-01T00:00:00Z",
  attempts: 173485,
  succeeded: 170196,
  failed: 880878,
  clientErrors: 403348,
  serverErrors: 414470,
  replays: 600486,
  incompleteWrites: 226308,
  unattributedKeys: 174670,
};
```

## Fields

| Field                                                                                     | Type                                                                                      | Required                                                                                  | Description                                                                               | Example                                                                                   |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `start`                                                                                   | *string*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       | 2026-01-01T00:00:00Z                                                                      |
| `attempts`                                                                                | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |                                                                                           |
| `succeeded`                                                                               | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |                                                                                           |
| `failed`                                                                                  | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |                                                                                           |
| `clientErrors`                                                                            | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |                                                                                           |
| `serverErrors`                                                                            | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |                                                                                           |
| `replays`                                                                                 | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |                                                                                           |
| `incompleteWrites`                                                                        | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |                                                                                           |
| `unattributedKeys`                                                                        | *number*                                                                                  | :heavy_check_mark:                                                                        | N/A                                                                                       |                                                                                           |
| `p50Ms`                                                                                   | *number*                                                                                  | :heavy_minus_sign:                                                                        | Continuous percentile over retained attempts. Omitted when there are no captured samples. |                                                                                           |
| `p95Ms`                                                                                   | *number*                                                                                  | :heavy_minus_sign:                                                                        | Continuous percentile over retained attempts. Omitted when there are no captured samples. |                                                                                           |
| `p99Ms`                                                                                   | *number*                                                                                  | :heavy_minus_sign:                                                                        | Continuous percentile over retained attempts. Omitted when there are no captured samples. |                                                                                           |