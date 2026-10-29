# GetPolicyEvaluationResultResponse

## Example Usage

```typescript
import { GetPolicyEvaluationResultResponse } from "@noresponse/node/models/operations";

let value: GetPolicyEvaluationResultResponse = {
  headers: {},
  result: {
    evaluation: {
      id: "pev_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      environment: "live",
      status: "cancelled",
      policyVersion: 928754,
      scoringPolicy: "risk-2026-10.17+t1",
      createdAt: "2026-01-01T00:00:00Z",
      expiresAt: "2026-01-01T00:00:00Z",
      capturedAt: "2026-01-01T00:00:00Z",
      finishedAt: "2026-01-01T00:00:00Z",
      accounts: 295563,
      requests: 815318,
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
    report: {
      evaluatorVersion: "identity-threshold-evaluator-v2",
      inputSha256:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      cohortSha256:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      status: "proposal_requires_review",
      candidate: {
        stepUp: 395525,
        review: 468836,
        block: 745599,
      },
      scope: {},
    },
  },
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `headers`                                                                 | Record<string, *string*[]>                                                | :heavy_check_mark:                                                        | N/A                                                                       |
| `result`                                                                  | [models.PolicyEvaluationResult](../../models/policy-evaluation-result.md) | :heavy_check_mark:                                                        | N/A                                                                       |