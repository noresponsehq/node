# InvestigationCompleted

## Example Usage

```typescript
import { InvestigationCompleted } from "@noresponse/node/models";

let value: InvestigationCompleted = {
  investigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  status: "completed",
  errorCode: "expired",
  finishedAt: "2026-11-20T08:12:44.000Z",
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `investigationId`                                                                  | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                | inv_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                     |
| `personId`                                                                         | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                     |
| `status`                                                                           | [models.InvestigationCompletedStatus](../models/investigation-completed-status.md) | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `errorCode`                                                                        | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                | expired                                                                            |
| `finishedAt`                                                                       | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                | 2026-11-20T08:12:44.000Z                                                           |