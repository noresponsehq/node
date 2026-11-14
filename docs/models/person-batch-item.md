# PersonBatchItem

## Example Usage

```typescript
import { PersonBatchItem } from "@noresponse/node/models";

let value: PersonBatchItem = {
  index: 180820,
  id: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  outcome: "created",
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             | Example                                                                 |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `index`                                                                 | *number*                                                                | :heavy_check_mark:                                                      | The row's position in the request.                                      |                                                                         |
| `id`                                                                    | *string*                                                                | :heavy_check_mark:                                                      | N/A                                                                     | per_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                          |
| `outcome`                                                               | [models.PersonBatchItemOutcome](../models/person-batch-item-outcome.md) | :heavy_check_mark:                                                      | unchanged: the row matched a person with the same details.              |                                                                         |