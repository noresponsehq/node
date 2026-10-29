# PreviewPolicyResponse

## Example Usage

```typescript
import { PreviewPolicyResponse } from "@noresponse/node/models/operations";

let value: PreviewPolicyResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
    ],
    "key2": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    scope: "retained_first_answer_thresholds",
    policyVersion: 49511,
    from: "2026-01-01T00:00:00Z",
    to: "2026-01-01T00:00:00Z",
    retentionFrom: "2026-01-01T00:00:00Z",
    coverage: {
      scanned: 421964,
      eligible: 187050,
      missingScore: 457444,
      unsupported: 946221,
      truncated: true,
      completeRetainedWindow: false,
      historicalPopulationKnown: false,
    },
    changed: 376592,
    unchanged: 574092,
    transitions: [
      {
        from: "held",
        to: "allow",
        count: 337439,
      },
    ],
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `headers`                                              | Record<string, *string*[]>                             | :heavy_check_mark:                                     | N/A                                                    |
| `result`                                               | [models.PolicyPreview](../../models/policy-preview.md) | :heavy_check_mark:                                     | N/A                                                    |