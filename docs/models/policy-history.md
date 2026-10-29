# PolicyHistory

Immutable settings snapshots, newest first. history_complete is false when earlier versions predate capture. A restored version is published with a fresh version number. History is removed with the tenant.

## Example Usage

```typescript
import { PolicyHistory } from "@noresponse/node/models";

let value: PolicyHistory = {
  items: [
    {
      settings: {
        workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        environment: "live",
        retentionDays: 916371,
        policyVersion: 643042,
        updatedBy: "nrk_live_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        updatedAt: "2026-10-23T09:14:12.000Z",
        flows: {
          accountCreation: {
            stepUp: 630555,
            review: 62705,
            defaultDepth: "quick",
            inheritsAccountCreation: false,
            admission: "immediate",
            holdSeconds: 580362,
            onExpiry: "review",
          },
          login: {
            stepUp: 930785,
            review: 521557,
            defaultDepth: "quick",
            inheritsAccountCreation: false,
            admission: "immediate",
            holdSeconds: 131973,
            onExpiry: "block",
          },
          purchase: {
            stepUp: 207860,
            review: 558525,
            defaultDepth: "quick",
            inheritsAccountCreation: false,
            admission: "immediate",
            holdSeconds: 466586,
            onExpiry: "block",
          },
        },
        refusedSources: [],
      },
      recordedAt: "2026-01-01T00:00:00Z",
      changeReason: "Adjust thresholds after reviewing retained evidence",
      evaluation: {
        manifestSha256:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        inputSha256:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        cohortSha256:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        resultSha256:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        evaluatorSha256:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        evaluationId: "pev_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
        evaluatorVersion: "identity-threshold-evaluator-v2",
        buildVersion: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        capturedAt: "2026-01-01T00:00:00Z",
        publishedAt: "2026-01-01T00:00:00Z",
      },
    },
  ],
  hasMore: false,
  historyComplete: false,
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `items`                                                        | [models.PolicyHistoryItem](../models/policy-history-item.md)[] | :heavy_check_mark:                                             | N/A                                                            |
| `hasMore`                                                      | *boolean*                                                      | :heavy_check_mark:                                             | N/A                                                            |
| `nextBeforeVersion`                                            | *number*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `historyComplete`                                              | *boolean*                                                      | :heavy_check_mark:                                             | N/A                                                            |