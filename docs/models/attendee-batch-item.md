# AttendeeBatchItem

## Example Usage

```typescript
import { AttendeeBatchItem } from "@noresponse/node/models";

let value: AttendeeBatchItem = {
  index: 83692,
  id: "att_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  outcome: "unchanged",
};
```

## Fields

| Field                                                                       | Type                                                                        | Required                                                                    | Description                                                                 | Example                                                                     |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `index`                                                                     | *number*                                                                    | :heavy_check_mark:                                                          | The row's position in the request.                                          |                                                                             |
| `id`                                                                        | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         | att_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                              |
| `outcome`                                                                   | [models.AttendeeBatchItemOutcome](../models/attendee-batch-item-outcome.md) | :heavy_check_mark:                                                          | unchanged: the row matched an attendee with the same details.               |                                                                             |