# RiskDetails

Detailed view only (response_mode=detailed, which needs the detailed scope); a standard answer leaves it out. Merged observations without provider, source, origin, raw breach record, value or score.

## Example Usage

```typescript
import { RiskDetails } from "@noresponse/node/models";

let value: RiskDetails = {
  phoneNames: [
    {
      value: "Alex Example",
      seenBy: 583889,
    },
  ],
  breaches: [
    {
      name: "Example Forum",
      domain: "forum.example.com",
      category: "forum",
      kind: "hacking_forum",
      matchedOn: "email",
    },
  ],
  breachNames: [
    {
      value: "Alex Example",
      seenIn: 714857,
    },
  ],
  events: [
    {
      year: 309976,
      kind: "last_active",
      site: "example.com",
      category: "site_breach",
      family: "breach",
      identifier: "email",
    },
  ],
};
```

## Fields

| Field                                                                                                                                                                                                                                                                   | Type                                                                                                                                                                                                                                                                    | Required                                                                                                                                                                                                                                                                | Description                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `phoneNames`                                                                                                                                                                                                                                                            | [models.RiskDetailsPhoneName](../models/risk-details-phone-name.md)[]                                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                                                                                      | N/A                                                                                                                                                                                                                                                                     |
| `breaches`                                                                                                                                                                                                                                                              | [models.Breach](../models/breach.md)[]                                                                                                                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                                                                                                                      | The matching breach tables, newest first, at most 100.                                                                                                                                                                                                                  |
| `breachNames`                                                                                                                                                                                                                                                           | [models.RiskDetailsBreachName](../models/risk-details-breach-name.md)[]                                                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                                                                                                                      | Names found next to the identifiers in breach records, merged, with the number of distinct tables each was seen in.                                                                                                                                                     |
| `events`                                                                                                                                                                                                                                                                | [models.RiskDetailsEvent](../models/risk-details-event.md)[]                                                                                                                                                                                                            | :heavy_minus_sign:                                                                                                                                                                                                                                                      | The identity's dated footprint events, newest first, at most 300: the year and month, what happened (created, last_active, breached), the site, its category, the kind of evidence and the identifier it belongs to. No breach value: dates are coarsened to the month. |