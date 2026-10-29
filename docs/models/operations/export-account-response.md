# ExportAccountResponse

## Example Usage

```typescript
import { ExportAccountResponse } from "@noresponse/node/models/operations";

let value: ExportAccountResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
    "key2": [
      "example 1",
    ],
  },
  result: {
    schemaVersion: "1",
    accountId: "acct_7f3a9c",
    exportedAt: "2026-01-01T00:00:00Z",
    complete: true,
    currentRiskVersion: 951119,
    assessments: [],
    decisions: [],
    outcomes: [
      {
        id: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        accountId: "acct_7f3a9c",
        outcome: "legitimate",
        supersedes: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        observedAt: "2026-01-01T00:00:00Z",
        receivedAt: "2026-01-01T00:00:00Z",
        expiresAt: "2026-01-02T00:00:00Z",
        externalRef: "case_123",
        actor: {
          type: "api_key",
          keyId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
          externalUserId: "usr_customer_admin",
          consoleCredentialId: "01JA2Z8K6Q4V7W9XBCDEFGHJKM",
          principalId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        },
        riskVersionBefore: 42381,
        riskVersion: 735895,
        effectiveOutcomeId: "out_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      },
    ],
    assessmentOutcomes: [],
    credentials: [],
    bindings: [],
    enforcements: [],
    requests: [
      {
        id: "req_77777777777777777777777777777777",
        requestId: "77777777777777777777777777777777",
        route: "POST /v1/assessments",
        httpStatus: 732188,
        durationMs: 414193,
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
    exclusions: [
      "legacy_outcome_notes",
    ],
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `headers`                                              | Record<string, *string*[]>                             | :heavy_check_mark:                                     | N/A                                                    |
| `result`                                               | [models.AccountExport](../../models/account-export.md) | :heavy_check_mark:                                     | N/A                                                    |