# ListRequestDiagnosticsResponse

## Example Usage

```typescript
import { ListRequestDiagnosticsResponse } from "@noresponse/node/models/operations";

let value: ListRequestDiagnosticsResponse = {
  headers: {
    "key": [],
    "key1": [],
  },
  result: {
    items: [
      {
        id: "req_77777777777777777777777777777777",
        requestId: "77777777777777777777777777777777",
        route: "POST /v1/assessments",
        httpStatus: 286048,
        durationMs: 249816,
        startedAt: "2026-01-01T00:00:00Z",
        completedAt: "2026-01-01T00:00:00Z",
        expiresAt: "2026-01-02T00:00:00Z",
        errorCode: "invalid_request",
        idempotentReplayed: true,
        writeComplete: true,
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
      },
    ],
    nextCursor:
      "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
  },
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `headers`                                                               | Record<string, *string*[]>                                              | :heavy_check_mark:                                                      | N/A                                                                     |
| `result`                                                                | [models.RequestDiagnosticPage](../../models/request-diagnostic-page.md) | :heavy_check_mark:                                                      | N/A                                                                     |