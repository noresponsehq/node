# OperationalAggregateQueue

Current retained delivery queue, independent of the requested attempt window and status filter. Endpoint filter applies. Does not prove customer enforcement execution.

## Example Usage

```typescript
import { OperationalAggregateQueue } from "@noresponse/node/models";

let value: OperationalAggregateQueue = {
  pending: 603637,
  leased: 79717,
  deadRetained: 701458,
  oldestPendingAt: "2026-01-01T00:00:00Z",
};
```

## Fields

| Field                | Type                 | Required             | Description          | Example              |
| -------------------- | -------------------- | -------------------- | -------------------- | -------------------- |
| `pending`            | *number*             | :heavy_check_mark:   | N/A                  |                      |
| `leased`             | *number*             | :heavy_check_mark:   | N/A                  |                      |
| `deadRetained`       | *number*             | :heavy_check_mark:   | N/A                  |                      |
| `oldestPendingAt`    | *string*             | :heavy_minus_sign:   | N/A                  | 2026-01-01T00:00:00Z |