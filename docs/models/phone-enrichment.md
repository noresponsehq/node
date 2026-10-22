# PhoneEnrichment

Facts about the number only: line type, carrier and country. The upstream provider, its scores and its verdicts stay internal.

## Example Usage

```typescript
import { PhoneEnrichment } from "@noresponse/node/models";

let value: PhoneEnrichment = {
  fields: {
    phone: "+61412345678",
    name: "Alex Example",
    carrier: "Telstra",
    lineType: "mobile",
    entityType: "person",
    countryCode: "61",
    country: "Australia",
    state: "New South Wales",
    city: "Sydney",
    location: "Sydney, New South Wales, Australia",
    nationalFormat: "0412 345 678",
    jobTitle: "Engineer",
    companyName: "Example Pty Ltd",
    email: "new.user@example.com",
    website: "https://example.com",
    firstCallAt: "2026-09-01T00:00:00.000Z",
    lastCallAt: "2026-10-10T00:00:00.000Z",
    matchedName: "Alex Example",
    alternateNames: [
      "Alex E.",
    ],
    nameCandidates: [
      "Alex Example",
    ],
    timezones: [
      "Australia/Sydney",
    ],
    emails: [
      "new.user@example.com",
    ],
    websites: [
      "https://example.com",
    ],
    locations: [
      "Sydney, New South Wales, Australia",
    ],
    socialProfiles: [
      "https://example.com/alexexample",
    ],
  },
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `fields`                                                             | [models.PhoneEnrichmentFields](../models/phone-enrichment-fields.md) | :heavy_check_mark:                                                   | N/A                                                                  |