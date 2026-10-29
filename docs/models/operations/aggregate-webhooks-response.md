# AggregateWebhooksResponse

## Example Usage

```typescript
import { AggregateWebhooksResponse } from "@noresponse/node/models/operations";

let value: AggregateWebhooksResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [
      "example 1",
      "example 2",
      "example 3",
    ],
  },
  result: {
    schemaVersion: "1",
    source: "webhook_attempts",
    from: "2026-01-01T00:00:00Z",
    to: "2026-01-01T00:00:00Z",
    asOf: "2026-01-01T00:00:00Z",
    retainedFrom: "2026-01-01T00:00:00Z",
    retentionDays: 611375,
    bucket: "hour",
    capture: "best_effort",
    population: "retained_attempts",
    totals: {
      attempts: 636679,
      succeeded: 119463,
      failed: 387056,
      clientErrors: 453934,
      serverErrors: 849488,
      replays: 343356,
      incompleteWrites: 157628,
      unattributedKeys: 449916,
    },
    buckets: [
      {
        start: "2026-01-01T00:00:00Z",
        attempts: 224557,
        succeeded: 617741,
        failed: 332688,
        clientErrors: 981533,
        serverErrors: 635887,
        replays: 896172,
        incompleteWrites: 275777,
        unattributedKeys: 896917,
      },
    ],
    queue: {
      pending: 161093,
      leased: 822407,
      deadRetained: 378294,
      oldestPendingAt: "2026-01-01T00:00:00Z",
    },
  },
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `headers`                                                            | Record<string, *string*[]>                                           | :heavy_check_mark:                                                   | N/A                                                                  |
| `result`                                                             | [models.OperationalAggregate](../../models/operational-aggregate.md) | :heavy_check_mark:                                                   | N/A                                                                  |