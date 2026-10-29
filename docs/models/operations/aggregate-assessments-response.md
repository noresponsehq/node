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
    timeZone: "UTC",
    groupsTruncated: true,
    coverage: {
      asOf: "2026-01-01T00:00:00Z",
      firstAnswersStartedAt: "2026-01-01T00:00:00Z",
      scoreOutcomesStartedAt: "2026-01-01T00:00:00Z",
      retainedFrom: "2026-01-01T00:00:00Z",
      population: "retained_first_answers",
      erasedRecordsIncluded: false,
      overlappingGroups: true,
      lateFlipUnit: "decision_transitions",
      historicalBackfill: false,
    },
    buckets: [],
  },
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `headers`                                                          | Record<string, *string*[]>                                         | :heavy_check_mark:                                                 | N/A                                                                |
| `result`                                                           | [models.AssessmentAggregate](../../models/assessment-aggregate.md) | :heavy_check_mark:                                                 | N/A                                                                |