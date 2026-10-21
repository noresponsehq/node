# RecordAssessmentOutcomeResponse

## Example Usage

```typescript
import { RecordAssessmentOutcomeResponse } from "@noresponse/node/models/operations";

let value: RecordAssessmentOutcomeResponse = {
  headers: {
    "key": [
      "<value 1>",
      "<value 2>",
      "<value 3>",
    ],
    "key1": [],
    "key2": [],
  },
  result: {
    id: "<id>",
    assessmentId: "<id>",
    outcome: "account_takeover",
    receivedAt: "<value>",
  },
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `headers`                                                      | Record<string, *string*[]>                                     | :heavy_check_mark:                                             | N/A                                                            |
| `result`                                                       | [models.AssessmentOutcome](../../models/assessment-outcome.md) | :heavy_check_mark:                                             | N/A                                                            |