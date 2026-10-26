# AttributeAgreement

How far independent sources agree on one attribute: values is the number of distinct values reported, support the tables and profiles reporting any, and agreement match (one value), partial (the most reported value holds more than half the support) or mismatch. The values themselves are not served.

## Example Usage

```typescript
import { AttributeAgreement } from "@noresponse/node/models";

let value: AttributeAgreement = {
  agreement: "match",
  values: 811988,
  support: 137827,
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `agreement`                                | [models.Agreement](../models/agreement.md) | :heavy_check_mark:                         | N/A                                        |
| `values`                                   | *number*                                   | :heavy_check_mark:                         | N/A                                        |
| `support`                                  | *number*                                   | :heavy_check_mark:                         | N/A                                        |