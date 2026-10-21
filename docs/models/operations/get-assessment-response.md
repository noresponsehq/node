# GetAssessmentResponse

## Example Usage

```typescript
import { GetAssessmentResponse } from "@noresponse/node/models/operations";

let value: GetAssessmentResponse = {
  headers: {
    "key": [
      "<value 1>",
    ],
  },
  result: {
    schemaVersion: "1",
    assessmentId: "<id>",
    accountId: "<id>",
    status: "partial",
    confidence: "unavailable",
    incompleteSources: [],
    policyVersion: "<value>",
    policyBasis: "heuristic_unvalidated",
    assessmentVersion: 557856,
    createdAt: "1713823255088",
    updatedAt: "1735664405472",
    expiresAt: "1736260877669",
    timing: {
      deadlineMs: 898586,
      elapsedMs: 516216,
    },
  },
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `headers`                                       | Record<string, *string*[]>                      | :heavy_check_mark:                              | N/A                                             |
| `result`                                        | [models.Assessment](../../models/assessment.md) | :heavy_check_mark:                              | N/A                                             |