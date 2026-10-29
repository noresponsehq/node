# Publication

Immutable publication provenance remains in policy history after evaluation evidence expires. SHA-256 values identify the frozen manifest, evaluator semantic input, cohort, and canonical result separately.

## Example Usage

```typescript
import { Publication } from "@noresponse/node/models";

let value: Publication = {
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
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      | Example                                                          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `manifestSha256`                                                 | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| `inputSha256`                                                    | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| `cohortSha256`                                                   | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| `resultSha256`                                                   | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| `evaluatorSha256`                                                | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| `evaluationId`                                                   | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | pev_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                   |
| `evaluatorVersion`                                               | *"identity-threshold-evaluator-v2"*                              | :heavy_check_mark:                                               | N/A                                                              |                                                                  |
| `buildVersion`                                                   | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa                         |
| `capturedAt`                                                     | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | 2026-01-01T00:00:00Z                                             |
| `publishedAt`                                                    | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              | 2026-01-01T00:00:00Z                                             |