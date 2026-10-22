# RecordAssessmentOutcomeResponse

## Example Usage

```typescript
import { RecordAssessmentOutcomeResponse } from "@noresponse/node/models/operations";

let value: RecordAssessmentOutcomeResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
      "example 3",
    ],
    "key1": [],
    "key2": [],
  },
  result: {
    id: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    outcome: "account_takeover",
    receivedAt: "2026-10-14T09:05:00.000Z",
  },
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `headers`                                                      | Record<string, *string*[]>                                     | :heavy_check_mark:                                             | N/A                                                            |
| `result`                                                       | [models.AssessmentOutcome](../../models/assessment-outcome.md) | :heavy_check_mark:                                             | N/A                                                            |