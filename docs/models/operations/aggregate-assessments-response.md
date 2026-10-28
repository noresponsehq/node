# AggregateAssessmentsResponse

## Example Usage

```typescript
import { AggregateAssessmentsResponse } from "@noresponse/node/models/operations";

let value: AggregateAssessmentsResponse = {
  headers: {},
  result: {
    schemaVersion: "1",
    from: "2026-10-19T00:00:00.000Z",
    to: "2026-10-26T00:00:00.000Z",
    bucket: "day",
    groupBy: [
      "decision",
    ],
    metrics: [
      "count",
    ],
    groupsTruncated: true,
    buckets: [
      {
        start: "2026-10-19T00:00:00.000Z",
        groups: [
          {
            country: "GB",
            count: 956627,
          },
        ],
      },
    ],
  },
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `headers`                                                          | Record<string, *string*[]>                                         | :heavy_check_mark:                                                 | N/A                                                                |
| `result`                                                           | [models.AssessmentAggregate](../../models/assessment-aggregate.md) | :heavy_check_mark:                                                 | N/A                                                                |