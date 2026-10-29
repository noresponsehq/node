# RequestAggregateRequest

Count every retained matching attempt in [from,to). Capture is best effort; missing attempts cannot be inferred. UTC buckets may be partial at the edges. The window is at most 7 days.

## Example Usage

```typescript
import { RequestAggregateRequest } from "@noresponse/node/models";

let value: RequestAggregateRequest = {
  from: "2026-01-01T00:00:00Z",
  to: "2026-01-01T00:00:00Z",
  route: "POST /v1/assessments",
  apiKeyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                                                 | Type                                                                                  | Required                                                                              | Description                                                                           | Example                                                                               |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `from`                                                                                | *string*                                                                              | :heavy_check_mark:                                                                    | N/A                                                                                   | 2026-01-01T00:00:00Z                                                                  |
| `to`                                                                                  | *string*                                                                              | :heavy_check_mark:                                                                    | N/A                                                                                   | 2026-01-01T00:00:00Z                                                                  |
| `bucket`                                                                              | [models.RequestAggregateRequestBucket](../models/request-aggregate-request-bucket.md) | :heavy_minus_sign:                                                                    | N/A                                                                                   |                                                                                       |
| `status`                                                                              | *number*                                                                              | :heavy_minus_sign:                                                                    | N/A                                                                                   |                                                                                       |
| `route`                                                                               | *string*                                                                              | :heavy_minus_sign:                                                                    | N/A                                                                                   | POST /v1/assessments                                                                  |
| `apiKeyId`                                                                            | *string*                                                                              | :heavy_minus_sign:                                                                    | N/A                                                                                   | 01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                            |