# RiskDetails

Detailed view only (response_mode=detailed, which needs the detailed scope); a standard answer leaves it out. Merged observations without provider, source, origin, raw breach record, value or score.

## Example Usage

```typescript
import { RiskDetails } from "@noresponse/node/models";

let value: RiskDetails = {
  phoneNames: [
    {
      value: "Alex Example",
      seenBy: 176739,
    },
  ],
  breaches: [
    {
      name: "Example Forum",
      domain: "forum.example.com",
      category: "forum",
      kind: "darkweb_site",
      matchedOn: "ip",
    },
  ],
  breachNames: [
    {
      value: "Alex Example",
      seenIn: 749093,
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