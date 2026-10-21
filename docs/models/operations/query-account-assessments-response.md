# QueryAccountAssessmentsResponse

## Example Usage

```typescript
import { QueryAccountAssessmentsResponse } from "@noresponse/node/models/operations";

let value: QueryAccountAssessmentsResponse = {
  headers: {},
  result: {
    schemaVersion: "1",
    accountId: "<id>",
    items: [
      {
        schemaVersion: "1",
        assessmentId: "<id>",
        accountId: "<id>",
        status: "complete",
        confidence: "unavailable",
        incompleteSources: [],
        policyVersion: "<value>",
        policyBasis: "heuristic_unvalidated",
        assessmentVersion: 868385,
        createdAt: "1732829781544",
        updatedAt: "1735606369154",
        expiresAt: "1742083909143",
        timing: {
          deadlineMs: 898586,
          elapsedMs: 516216,
        },
      },
    ],
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `headers`                                                | Record<string, *string*[]>                               | :heavy_check_mark:                                       | N/A                                                      |
| `result`                                                 | [models.AssessmentList](../../models/assessment-list.md) | :heavy_check_mark:                                       | N/A                                                      |