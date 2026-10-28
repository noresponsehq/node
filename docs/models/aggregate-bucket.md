# AggregateBucket

## Example Usage

```typescript
import { AggregateBucket } from "@noresponse/node/models";

let value: AggregateBucket = {
  start: "2026-10-19T00:00:00.000Z",
  groups: [
    {
      country: "GB",
      count: 956627,
    },
  ],
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `start`                                                                                          | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              | 2026-10-19T00:00:00.000Z                                                                         |
| `count`                                                                                          | *number*                                                                                         | :heavy_minus_sign:                                                                               | Assessments first answered whose creation falls in the bucket. With metric count.                |                                                                                                  |
| `groups`                                                                                         | [models.AggregateGroup](../models/aggregate-group.md)[]                                          | :heavy_minus_sign:                                                                               | With metric count and group_by: the bucket's counts of the groups answered, largest group first. |                                                                                                  |
| `scoreHistogram`                                                                                 | [models.AggregateScoreCount](../models/aggregate-score-count.md)[]                               | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |
| `lateFlips`                                                                                      | [models.AggregateLateFlip](../models/aggregate-late-flip.md)[]                                   | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |