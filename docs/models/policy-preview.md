# PolicyPreview

Exact threshold transitions among eligible retained first answers, newest first within the limit. Partial older revisions without a frozen hold snapshot are reported as unsupported. Preview leaves account state, outcomes and source evidence unchanged.

## Example Usage

```typescript
import { PolicyPreview } from "@noresponse/node/models";

let value: PolicyPreview = {
  scope: "retained_first_answer_thresholds",
  policyVersion: 310451,
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
  changed: 982000,
  unchanged: 152828,
  transitions: [
    {
      from: "held",
      to: "allow",
      count: 337439,
    },
  ],
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `scope`                                                                    | *"retained_first_answer_thresholds"*                                       | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `policyVersion`                                                            | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `from`                                                                     | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        | 2026-01-01T00:00:00Z                                                       |
| `to`                                                                       | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        | 2026-01-01T00:00:00Z                                                       |
| `retentionFrom`                                                            | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        | 2026-01-01T00:00:00Z                                                       |
| `coverage`                                                                 | [models.PolicyPreviewCoverage](../models/policy-preview-coverage.md)       | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `changed`                                                                  | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `unchanged`                                                                | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |
| `transitions`                                                              | [models.PolicyPreviewTransition](../models/policy-preview-transition.md)[] | :heavy_check_mark:                                                         | N/A                                                                        |                                                                            |