# PolicyEvaluation

## Example Usage

```typescript
import { PolicyEvaluation } from "@noresponse/node/models";

let value: PolicyEvaluation = {
  id: "pev_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  environment: "test",
  status: "completed",
  policyVersion: 708979,
  scoringPolicy: "risk-2026-10.17+t1",
  createdAt: "2026-01-01T00:00:00Z",
  expiresAt: "2026-01-01T00:00:00Z",
  capturedAt: "2026-01-01T00:00:00Z",
  finishedAt: "2026-01-01T00:00:00Z",
  accounts: 641410,
  requests: 474549,
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
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `id`                                                                       | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        | pev_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                             |
| `environment`                                                              | [models.AuditSettingsEnvironment](../models/audit-settings-environment.md) | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `status`                                                                   | [models.PolicyEvaluationStatus](../models/policy-evaluation-status.md)     | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `policyVersion`                                                            | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `scoringPolicy`                                                            | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        | risk-2026-10.17+t1                                                         |
| `createdAt`                                                                | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        | 2026-01-01T00:00:00Z                                                       |
| `expiresAt`                                                                | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        | 2026-01-01T00:00:00Z                                                       |
| `capturedAt`                                                               | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | 2026-01-01T00:00:00Z                                                       |
| `finishedAt`                                                               | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | 2026-01-01T00:00:00Z                                                       |
| `accounts`                                                                 | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `requests`                                                                 | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `evaluatorVersion`                                                         | *"identity-threshold-evaluator-v2"*                                        | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `evaluatorSha256`                                                          | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa           |
| `buildVersion`                                                             | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | customer-platform-preview                                                  |
| `resultStatus`                                                             | [models.ResultStatus](../models/result-status.md)                          | :heavy_minus_sign:                                                         | N/A                                                                        |                                                                            |
| `errorCode`                                                                | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | evidence_invalidated                                                       |
| `publishedPolicyVersion`                                                   | *number*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        |                                                                            |
| `manifestSha256`                                                           | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa           |
| `inputSha256`                                                              | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa           |
| `cohortSha256`                                                             | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa           |
| `resultSha256`                                                             | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa           |