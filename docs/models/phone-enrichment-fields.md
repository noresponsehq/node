# PhoneEnrichmentFields

## Example Usage

```typescript
import { PhoneEnrichmentFields } from "@noresponse/node/models";

let value: PhoneEnrichmentFields = {
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
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        | Example                            |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `phone`                            | *string*                           | :heavy_minus_sign:                 | N/A                                | +61412345678                       |
| `name`                             | *string*                           | :heavy_minus_sign:                 | N/A                                | Alex Example                       |
| `carrier`                          | *string*                           | :heavy_minus_sign:                 | N/A                                | Telstra                            |
| `lineType`                         | *string*                           | :heavy_minus_sign:                 | N/A                                | mobile                             |
| `entityType`                       | *string*                           | :heavy_minus_sign:                 | N/A                                | person                             |
| `countryCode`                      | *string*                           | :heavy_minus_sign:                 | N/A                                | 61                                 |
| `country`                          | *string*                           | :heavy_minus_sign:                 | N/A                                | Australia                          |
| `state`                            | *string*                           | :heavy_minus_sign:                 | N/A                                | New South Wales                    |
| `city`                             | *string*                           | :heavy_minus_sign:                 | N/A                                | Sydney                             |
| `location`                         | *string*                           | :heavy_minus_sign:                 | N/A                                | Sydney, New South Wales, Australia |
| `nationalFormat`                   | *string*                           | :heavy_minus_sign:                 | N/A                                | 0412 345 678                       |
| `jobTitle`                         | *string*                           | :heavy_minus_sign:                 | N/A                                | Engineer                           |
| `companyName`                      | *string*                           | :heavy_minus_sign:                 | N/A                                | Example Pty Ltd                    |
| `email`                            | *string*                           | :heavy_minus_sign:                 | N/A                                | new.user@example.com               |
| `website`                          | *string*                           | :heavy_minus_sign:                 | N/A                                | https://example.com                |
| `firstCallAt`                      | *string*                           | :heavy_minus_sign:                 | N/A                                | 2026-09-01T00:00:00.000Z           |
| `lastCallAt`                       | *string*                           | :heavy_minus_sign:                 | N/A                                | 2026-10-10T00:00:00.000Z           |
| `matchedName`                      | *string*                           | :heavy_minus_sign:                 | N/A                                | Alex Example                       |
| `alternateNames`                   | *models.AlternateNameUnion*[]      | :heavy_minus_sign:                 | N/A                                |                                    |
| `nameCandidates`                   | *models.NameCandidateUnion*[]      | :heavy_minus_sign:                 | N/A                                |                                    |
| `timezones`                        | *models.TimezoneUnion*[]           | :heavy_minus_sign:                 | N/A                                |                                    |
| `emails`                           | *models.EmailUnion*[]              | :heavy_minus_sign:                 | N/A                                |                                    |
| `websites`                         | *models.WebsiteUnion*[]            | :heavy_minus_sign:                 | N/A                                |                                    |
| `locations`                        | *models.LocationUnion*[]           | :heavy_minus_sign:                 | N/A                                |                                    |
| `socialProfiles`                   | *models.SocialProfileUnion*[]      | :heavy_minus_sign:                 | N/A                                |                                    |
| `reportCount`                      | *number*                           | :heavy_minus_sign:                 | N/A                                |                                    |
| `tagCount`                         | *number*                           | :heavy_minus_sign:                 | N/A                                |                                    |
| `totalCalls`                       | *number*                           | :heavy_minus_sign:                 | N/A                                |                                    |
| `calls60Days`                      | *number*                           | :heavy_minus_sign:                 | N/A                                |                                    |
| `reports60Days`                    | *number*                           | :heavy_minus_sign:                 | N/A                                |                                    |
| `searches60Days`                   | *number*                           | :heavy_minus_sign:                 | N/A                                |                                    |
| `commentCount`                     | *number*                           | :heavy_minus_sign:                 | N/A                                |                                    |
| `namesCount`                       | *number*                           | :heavy_minus_sign:                 | N/A                                |                                    |
| `spamReportCount`                  | *number*                           | :heavy_minus_sign:                 | N/A                                |                                    |