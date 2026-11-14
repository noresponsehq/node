# PersonBatchRequest

Adds or updates 1 to 500 people. A row naming an existing person of the group (the same external_id, else the same email, else the same phone) updates it.

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
          platform: "threads",
          handle: "jordan_example",
        },
      ],
    },
  ],
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `people`                                                | [models.PersonIdentity](../models/person-identity.md)[] | :heavy_check_mark:                                      | N/A                                                     |