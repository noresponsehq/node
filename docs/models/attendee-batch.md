# AttendeeBatch

What the batch did, row by row.

## Example Usage

```typescript
import { AttendeeBatch } from "@noresponse/node/models";

let value: AttendeeBatch = {
  created: 320710,
  updated: 343254,
  items: [],
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `created`                                                      | *number*                                                       | :heavy_check_mark:                                             | N/A                                                            |
| `updated`                                                      | *number*                                                       | :heavy_check_mark:                                             | N/A                                                            |
| `items`                                                        | [models.AttendeeBatchItem](../models/attendee-batch-item.md)[] | :heavy_check_mark:                                             | N/A                                                            |