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
      sites: [
        "forum.example.com",
      ],
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
  accounts: [
    {
      name: "Wix",
      domain: "wix.com",
      identifier: "username",
      outcome: "inconclusive",
      firstNamePrefix: "Al",
    },
  ],
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                                                                           | Type                                                                                                                                                                                                                                                                                                                                                            | Required                                                                                                                                                                                                                                                                                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `phoneNames`                                                                                                                                                                                                                                                                                                                                                    | [models.RiskDetailsPhoneName](../models/risk-details-phone-name.md)[]                                                                                                                                                                                                                                                                                           | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                              | N/A                                                                                                                                                                                                                                                                                                                                                             |
| `breaches`                                                                                                                                                                                                                                                                                                                                                      | [models.Breach](../models/breach.md)[]                                                                                                                                                                                                                                                                                                                          | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                              | The matching breach tables, newest first, at most 100.                                                                                                                                                                                                                                                                                                          |
| `breachNames`                                                                                                                                                                                                                                                                                                                                                   | [models.RiskDetailsBreachName](../models/risk-details-breach-name.md)[]                                                                                                                                                                                                                                                                                         | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                              | Names found next to the identifiers in breach records, merged, with the number of distinct tables each was seen in and the sites of those tables.                                                                                                                                                                                                               |
| `events`                                                                                                                                                                                                                                                                                                                                                        | [models.RiskDetailsEvent](../models/risk-details-event.md)[]                                                                                                                                                                                                                                                                                                    | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                              | The identity's dated footprint events, newest first, at most 300: the year and month, what happened (created, last_active, breached), the site, its category, the kind of evidence and the identifier it belongs to. No breach value: dates are coarsened to the month.                                                                                         |
| `accounts`                                                                                                                                                                                                                                                                                                                                                      | [models.OnlineAccount](../models/online-account.md)[]                                                                                                                                                                                                                                                                                                           | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                              | Every online-account search of the email or username: the platform, what the search came to and, for an account found, what the platform returned beside it. Found first, then not found, then searches that failed or are still running, each by platform name; at most 64. A failed or running search keeps its own outcome and is not reported as not_found. |