# PhoneEnrichment

Facts about the number only: line type, carrier and country. The upstream provider, its scores and its verdicts stay internal.

## Example Usage

```typescript
import { PhoneEnrichment } from "@noresponse/node/models";

let value: PhoneEnrichment = {
  fields: {},
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `fields`                                                             | [models.PhoneEnrichmentFields](../models/phone-enrichment-fields.md) | :heavy_check_mark:                                                   | N/A                                                                  |