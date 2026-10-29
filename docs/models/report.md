# Report

## Example Usage

```typescript
import { Report } from "@noresponse/node/models";

let value: Report = {
  evaluatorVersion: "identity-threshold-evaluator-v2",
  inputSha256:
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  cohortSha256:
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  status: "no_change",
  candidate: {
    stepUp: 395525,
    review: 468836,
    block: 745599,
  },
  scope: {},
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      | Example                                                          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `evaluatorVersion`                                               | *"identity-threshold-evaluator-v2"*                              | :heavy_check_mark:                                               | N/A                                                              |                                                                  |
| `inputSha256`                                                    | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| `cohortSha256`                                                   | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| `status`                                                         | [models.ResultStatus](../models/result-status.md)                | :heavy_check_mark:                                               | N/A                                                              |                                                                  |
| `candidate`                                                      | [models.Thresholds](../models/thresholds.md)                     | :heavy_check_mark:                                               | N/A                                                              |                                                                  |
| `scope`                                                          | [models.ReportScope](../models/report-scope.md)                  | :heavy_check_mark:                                               | N/A                                                              |                                                                  |