# CancelPolicyEvaluationResponse

## Example Usage

```typescript
import { CancelPolicyEvaluationResponse } from "@noresponse/node/models/operations";

let value: CancelPolicyEvaluationResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [],
  },
  result: {
    id: "pev_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    environment: "live",
    status: "completed",
    policyVersion: 701354,
    scoringPolicy: "risk-2026-10.17+t1",
    createdAt: "2026-01-01T00:00:00Z",
    expiresAt: "2026-01-01T00:00:00Z",
    capturedAt: "2026-01-01T00:00:00Z",
    finishedAt: "2026-01-01T00:00:00Z",
    accounts: 672631,
    requests: 412014,
    evaluatorVersion: "identity-threshold-evaluator-v2",
    evaluatorSha256:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    buildVersion: "customer-platform-preview",
    errorCode: "evidence_invalidated",
    manifestSha256:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    inputSha256:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    cohortSha256:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    resultSha256:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `headers`                                                    | Record<string, *string*[]>                                   | :heavy_check_mark:                                           | N/A                                                          |
| `result`                                                     | [models.PolicyEvaluation](../../models/policy-evaluation.md) | :heavy_check_mark:                                           | N/A                                                          |