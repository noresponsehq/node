# CreatePolicyEvaluationRequest

## Example Usage

```typescript
import { CreatePolicyEvaluationRequest } from "@noresponse/node/models/operations";

let value: CreatePolicyEvaluationRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  environment: "test",
  idempotencyKey: "account-acct_7f3a9c",
  body: {
    expectedPolicyVersion: 842427,
    from: "2026-01-01T00:00:00Z",
    to: "2026-01-02T00:00:00Z",
    candidates: [
      {
        stepUp: 351645,
        review: 222859,
        block: 178058,
      },
    ],
    costs: {
      legitimate: {
        allow: 7530.58,
        stepUp: 4910.24,
        review: 2661.77,
        block: 5992.19,
      },
      abuse: {
        allow: 8314.74,
        stepUp: 6595.2,
        review: 7530.73,
        block: 424.61,
      },
    },
    limits: {
      reviewRate: 4578.36,
      serverErrorRate: 7206.96,
      unavailableResultRate: 3724.79,
      p95Ms: 5013.51,
    },
    labelCollection:
      "Customer support reviewed the outcome labels for the selected cohort.",
    splitSeed: "reviewed-cohort-seed-01",
  },
};
```

## Fields

| Field                                                                                                                                                                  | Type                                                                                                                                                                   | Required                                                                                                                                                               | Description                                                                                                                                                            | Example                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                                                          | *string*                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                     | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.                                     | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                         |
| `environment`                                                                                                                                                          | [models.KeyEnvironment](../../models/key-environment.md)                                                                                                               | :heavy_check_mark:                                                                                                                                                     | The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404. |                                                                                                                                                                        |
| `idempotencyKey`                                                                                                                                                       | *string*                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                     | Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours.      | account-acct_7f3a9c                                                                                                                                                    |
| `body`                                                                                                                                                                 | [models.PolicyEvaluationRequest](../../models/policy-evaluation-request.md)                                                                                            | :heavy_check_mark:                                                                                                                                                     | N/A                                                                                                                                                                    |                                                                                                                                                                        |