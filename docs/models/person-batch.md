# PersonBatch

What the batch did, row by row.

## Example Usage

```typescript
import { PersonBatch } from "@noresponse/node/models";

let value: PersonBatch = {
  created: 260689,
  updated: 396331,
  items: [],
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `created`                                                  | *number*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `updated`                                                  | *number*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `items`                                                    | [models.PersonBatchItem](../models/person-batch-item.md)[] | :heavy_check_mark:                                         | N/A                                                        |