# RiskDetails

Detailed view only (response_mode=detailed, which needs the detailed scope); a standard answer leaves it out. Merged observations without provider, source, origin, raw breach record, value or score.

## Example Usage

```typescript
import { RiskDetails } from "@noresponse/node/models";

let value: RiskDetails = {
  phoneNames: [
    {
      value: "Alex Example",
      seenBy: 150748,
    },
  ],
  breaches: [
    {
      name: "Example Forum",
      domain: "forum.example.com",
      category: "forum",
      kind: "credential_list",
      matchedOn: "username",
    },
  ],
  breachNames: [
    {
      value: "Alex Example",
      seenIn: 571629,
    },
  ],
};
```

## Fields

| Field                                                                                                               | Type                                                                                                                | Required                                                                                                            | Description                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `phoneNames`                                                                                                        | [models.RiskDetailsPhoneName](../models/risk-details-phone-name.md)[]                                               | :heavy_minus_sign:                                                                                                  | N/A                                                                                                                 |
| `breaches`                                                                                                          | [models.Breach](../models/breach.md)[]                                                                              | :heavy_minus_sign:                                                                                                  | The matching breach tables, newest first, at most 50.                                                               |
| `breachNames`                                                                                                       | [models.RiskDetailsBreachName](../models/risk-details-breach-name.md)[]                                             | :heavy_minus_sign:                                                                                                  | Names found next to the identifiers in breach records, merged, with the number of distinct tables each was seen in. |