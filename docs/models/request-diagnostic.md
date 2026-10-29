# RequestDiagnostic

One authenticated HTTP attempt. An attempt id is independent of the caller correlation id. No raw body, path parameter, credential or source payload is retained. write_complete means the server wrote/flushed its response, not proof the client processed it. Collection is bounded best effort; ii_signup_request_diagnostic_failures_total exposes gaps. Retained for seven days or the shorter environment retention.

## Example Usage

```typescript
import { RequestDiagnostic } from "@noresponse/node/models";

let value: RequestDiagnostic = {
  id: "req_77777777777777777777777777777777",
  requestId: "77777777777777777777777777777777",
  route: "POST /v1/assessments",
  httpStatus: 792257,
  durationMs: 111339,
  startedAt: "2026-01-01T00:00:00Z",
  completedAt: "2026-01-01T00:00:00Z",
  expiresAt: "2026-01-02T00:00:00Z",
  errorCode: "invalid_request",
  idempotentReplayed: true,
  writeComplete: false,
  decision: {
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    assessmentVersion: 407926,
    policyVersion: "risk-2026-10.17+t1",
    flow: "login",
    status: "complete",
    account: {
      schemaVersion: "1",
      id: "acct_7f3a9c",
      risk: {
        score: 557856,
        decision: "step_up",
        reasons: [
          {
            code: "no_digital_footprint",
            direction: "neutral",
            impact: "medium",
            listEntryId: "lst_01JA2ZE4K5M6N7P8Q9R0S1T2V3",
          },
        ],
      },
      decisionsByFlow: {
        accountCreation: "block",
        login: "allow",
        purchase: "held",
      },
      assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      updatedAt: "2026-10-14T09:00:00.412Z",
      riskVersion: 698486,
    },
  },
  apiKeyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                                                                                                                                  | Type                                                                                                                                                   | Required                                                                                                                                               | Description                                                                                                                                            | Example                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                                   | *string*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    | req_77777777777777777777777777777777                                                                                                                   |
| `requestId`                                                                                                                                            | *string*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    | 77777777777777777777777777777777                                                                                                                       |
| `route`                                                                                                                                                | *string*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    | POST /v1/assessments                                                                                                                                   |
| `httpStatus`                                                                                                                                           | *number*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    |                                                                                                                                                        |
| `durationMs`                                                                                                                                           | *number*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    |                                                                                                                                                        |
| `startedAt`                                                                                                                                            | *string*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    | 2026-01-01T00:00:00Z                                                                                                                                   |
| `completedAt`                                                                                                                                          | *string*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    | 2026-01-01T00:00:00Z                                                                                                                                   |
| `expiresAt`                                                                                                                                            | *string*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    | 2026-01-02T00:00:00Z                                                                                                                                   |
| `errorCode`                                                                                                                                            | *string*                                                                                                                                               | :heavy_minus_sign:                                                                                                                                     | N/A                                                                                                                                                    | invalid_request                                                                                                                                        |
| `idempotentReplayed`                                                                                                                                   | *boolean*                                                                                                                                              | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    |                                                                                                                                                        |
| `writeComplete`                                                                                                                                        | *boolean*                                                                                                                                              | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    |                                                                                                                                                        |
| `decision`                                                                                                                                             | [models.DecisionReceipt](../models/decision-receipt.md)                                                                                                | :heavy_minus_sign:                                                                                                                                     | The decision prepared for one HTTP attempt. Its account field preserves the account decision returned for that attempt, even after subsequent changes. |                                                                                                                                                        |
| `apiKeyId`                                                                                                                                             | *string*                                                                                                                                               | :heavy_minus_sign:                                                                                                                                     | Public authenticated API key identifier. Absent for member requests and older unattributed diagnostics.                                                | 01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                             |