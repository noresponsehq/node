# PolicyEvaluationPublishRequest

## Example Usage

```typescript
import { PolicyEvaluationPublishRequest } from "@noresponse/node/models";

let value: PolicyEvaluationPublishRequest = {
  expectedPolicyVersion: 858806,
  manifestSha256:
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  inputSha256:
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  resultSha256:
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  candidate: {
    stepUp: 395525,
    review: 468836,
    block: 745599,
  },
  changeReason: "Reviewed the proposal and its capture coverage.",
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      | Example                                                          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `expectedPolicyVersion`                                          | *number*                                                         | :heavy_check_mark:                                               | N/A                                                              |                                                                  |
| `manifestSha256`                                                 | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| `inputSha256`                                                    | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| `resultSha256`                                                   | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| `candidate`                                                      | [models.Thresholds](../models/thresholds.md)                     | :heavy_check_mark:                                               | N/A                                                              |                                                                  |
| `changeReason`                                                   | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | Reviewed the proposal and its capture coverage.                  |