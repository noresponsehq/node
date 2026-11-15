# PersonBatchRequest

Adds 1 to 500 workspace people to the group. Reuses an explicit person_id or external_id. Matching email or phone values only suggest people; automatic merging is disabled.

## Example Usage

```typescript
import { PersonBatchRequest } from "@noresponse/node/models";

let value: PersonBatchRequest = {
  people: [
    {
      externalId: "ticket-1042",
      name: "Jordan Example",
      email: "jordan@company-example.com",
      phone: "+14155550100",
      company: "Example Ltd",
      city: "Melbourne",
      handles: [
        {
          platform: "bluesky",
          handle: "jordan_example",
        },
      ],
      personId: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    },
  ],
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `people`                                                | [models.PersonIdentity](../models/person-identity.md)[] | :heavy_check_mark:                                      | N/A                                                     |