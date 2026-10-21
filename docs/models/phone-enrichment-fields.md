# PhoneEnrichmentFields

## Example Usage

```typescript
import { PhoneEnrichmentFields } from "@noresponse/node/models";

let value: PhoneEnrichmentFields = {};
```

## Fields

| Field                         | Type                          | Required                      | Description                   |
| ----------------------------- | ----------------------------- | ----------------------------- | ----------------------------- |
| `phone`                       | *string*                      | :heavy_minus_sign:            | N/A                           |
| `name`                        | *string*                      | :heavy_minus_sign:            | N/A                           |
| `carrier`                     | *string*                      | :heavy_minus_sign:            | N/A                           |
| `lineType`                    | *string*                      | :heavy_minus_sign:            | N/A                           |
| `entityType`                  | *string*                      | :heavy_minus_sign:            | N/A                           |
| `countryCode`                 | *string*                      | :heavy_minus_sign:            | N/A                           |
| `country`                     | *string*                      | :heavy_minus_sign:            | N/A                           |
| `state`                       | *string*                      | :heavy_minus_sign:            | N/A                           |
| `city`                        | *string*                      | :heavy_minus_sign:            | N/A                           |
| `location`                    | *string*                      | :heavy_minus_sign:            | N/A                           |
| `nationalFormat`              | *string*                      | :heavy_minus_sign:            | N/A                           |
| `jobTitle`                    | *string*                      | :heavy_minus_sign:            | N/A                           |
| `companyName`                 | *string*                      | :heavy_minus_sign:            | N/A                           |
| `email`                       | *string*                      | :heavy_minus_sign:            | N/A                           |
| `website`                     | *string*                      | :heavy_minus_sign:            | N/A                           |
| `firstCallAt`                 | *string*                      | :heavy_minus_sign:            | N/A                           |
| `lastCallAt`                  | *string*                      | :heavy_minus_sign:            | N/A                           |
| `matchedName`                 | *string*                      | :heavy_minus_sign:            | N/A                           |
| `alternateNames`              | *models.AlternateNameUnion*[] | :heavy_minus_sign:            | N/A                           |
| `nameCandidates`              | *models.NameCandidateUnion*[] | :heavy_minus_sign:            | N/A                           |
| `timezones`                   | *models.TimezoneUnion*[]      | :heavy_minus_sign:            | N/A                           |
| `emails`                      | *models.EmailUnion*[]         | :heavy_minus_sign:            | N/A                           |
| `websites`                    | *models.WebsiteUnion*[]       | :heavy_minus_sign:            | N/A                           |
| `locations`                   | *models.LocationUnion*[]      | :heavy_minus_sign:            | N/A                           |
| `socialProfiles`              | *models.SocialProfileUnion*[] | :heavy_minus_sign:            | N/A                           |
| `reportCount`                 | *number*                      | :heavy_minus_sign:            | N/A                           |
| `tagCount`                    | *number*                      | :heavy_minus_sign:            | N/A                           |
| `totalCalls`                  | *number*                      | :heavy_minus_sign:            | N/A                           |
| `calls60Days`                 | *number*                      | :heavy_minus_sign:            | N/A                           |
| `reports60Days`               | *number*                      | :heavy_minus_sign:            | N/A                           |
| `searches60Days`              | *number*                      | :heavy_minus_sign:            | N/A                           |
| `commentCount`                | *number*                      | :heavy_minus_sign:            | N/A                           |
| `namesCount`                  | *number*                      | :heavy_minus_sign:            | N/A                           |
| `spamReportCount`             | *number*                      | :heavy_minus_sign:            | N/A                           |