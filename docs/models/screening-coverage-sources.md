# ScreeningCoverageSources

How many sources this search asked and how many answered, across the lookup stage (sources asked whether an account exists for an identifier) and the platform stage (profiles read on each platform). A source that answered may have found nothing; one that did not answer failed or ran out of time.

## Example Usage

```typescript
import { ScreeningCoverageSources } from "@noresponse/node/models";

let value: ScreeningCoverageSources = {
  asked: 198621,
  answered: 889004,
  lookups: {
    asked: 29292,
    answered: 419306,
  },
  platforms: {
    asked: 132385,
    answered: 298889,
  },
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `asked`                                         | *number*                                        | :heavy_check_mark:                              | Lookup sources plus platforms asked.            |
| `answered`                                      | *number*                                        | :heavy_check_mark:                              | Lookup sources plus platforms that answered.    |
| `lookups`                                       | [models.SourceCount](../models/source-count.md) | :heavy_check_mark:                              | N/A                                             |
| `platforms`                                     | [models.SourceCount](../models/source-count.md) | :heavy_check_mark:                              | N/A                                             |