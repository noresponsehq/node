# RiskSummary

A few typed facts per identifier. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer. Lanes that do not exist yet leave their members absent.

## Example Usage

```typescript
import { RiskSummary } from "@noresponse/node/models";

let value: RiskSummary = {
  phone: {
    country: "AU",
    carrier: "Telstra",
  },
  ip: {
    country: "AU",
  },
};
```

## Fields

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `phone`                                                                                                                                           | [models.RiskSummaryPhone](../models/risk-summary-phone.md)                                                                                        | :heavy_minus_sign:                                                                                                                                | N/A                                                                                                                                               |
| `email`                                                                                                                                           | [models.RiskSummaryEmail](../models/risk-summary-email.md)                                                                                        | :heavy_minus_sign:                                                                                                                                | N/A                                                                                                                                               |
| `username`                                                                                                                                        | [models.RiskSummaryUsername](../models/risk-summary-username.md)                                                                                  | :heavy_minus_sign:                                                                                                                                | N/A                                                                                                                                               |
| `ip`                                                                                                                                              | [models.IpSummary](../models/ip-summary.md)                                                                                                       | :heavy_minus_sign:                                                                                                                                | Facts about the submitted IP from the offline database and this tenant's own recent assessments. Every member is optional; absent makes no claim. |
| `consistency`                                                                                                                                     | [models.Consistency](../models/consistency.md)                                                                                                    | :heavy_minus_sign:                                                                                                                                | Cross-identifier agreement, computed from facts only. Every member is optional; absent makes no claim.                                            |