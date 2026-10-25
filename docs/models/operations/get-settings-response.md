# GetSettingsResponse

## Example Usage

```typescript
import { GetSettingsResponse } from "@noresponse/node/models/operations";

let value: GetSettingsResponse = {
  headers: {},
  result: {
    workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    environment: "live",
    retentionDays: 524070,
    policyVersion: 948922,
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
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `headers`                                   | Record<string, *string*[]>                  | :heavy_check_mark:                          | N/A                                         |
| `result`                                    | [models.Settings](../../models/settings.md) | :heavy_check_mark:                          | N/A                                         |