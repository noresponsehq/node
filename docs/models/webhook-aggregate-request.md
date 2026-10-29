# WebhookAggregateRequest

Count every retained matching attempt in [from,to). Capture is best effort; missing attempts cannot be inferred. UTC buckets may be partial at the edges. The window is at most 30 days.

## Example Usage

```typescript
import { WebhookAggregateRequest } from "@noresponse/node/models";

let value: WebhookAggregateRequest = {
  from: "2026-01-01T00:00:00Z",
  to: "2026-01-01T00:00:00Z",
  endpointId: "whe_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                                                 | Type                                                                                  | Required                                                                              | Description                                                                           | Example                                                                               |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `from`                                                                                | *string*                                                                              | :heavy_check_mark:                                                                    | N/A                                                                                   | 2026-01-01T00:00:00Z                                                                  |
| `to`                                                                                  | *string*                                                                              | :heavy_check_mark:                                                                    | N/A                                                                                   | 2026-01-01T00:00:00Z                                                                  |
| `bucket`                                                                              | [models.RequestAggregateRequestBucket](../models/request-aggregate-request-bucket.md) | :heavy_minus_sign:                                                                    | N/A                                                                                   |                                                                                       |
| `status`                                                                              | *number*                                                                              | :heavy_minus_sign:                                                                    | N/A                                                                                   |                                                                                       |
| `endpointId`                                                                          | *string*                                                                              | :heavy_minus_sign:                                                                    | Opaque id of the endpoint registration.                                               | whe_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                        |