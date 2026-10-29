# ListPolicyEvaluationsResponse

## Example Usage

```typescript
import { ListPolicyEvaluationsResponse } from "@noresponse/node/models/operations";

let value: ListPolicyEvaluationsResponse = {
  headers: {},
  result: {
    items: [
      {
        id: "pev_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        environment: "test",
        status: "running",
        policyVersion: 722030,
        scoringPolicy: "risk-2026-10.17+t1",
        createdAt: "2026-01-01T00:00:00Z",
        expiresAt: "2026-01-01T00:00:00Z",
        capturedAt: "2026-01-01T00:00:00Z",
        finishedAt: "2026-01-01T00:00:00Z",
        accounts: 756893,
        requests: 928716,
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
    ],
    nextBefore: "pev_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `headers`                                                             | Record<string, *string*[]>                                            | :heavy_check_mark:                                                    | N/A                                                                   |
| `result`                                                              | [models.PolicyEvaluationList](../../models/policy-evaluation-list.md) | :heavy_check_mark:                                                    | N/A                                                                   |