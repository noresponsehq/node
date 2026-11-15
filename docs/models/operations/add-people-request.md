# AddPeopleRequest

## Example Usage

```typescript
import { AddPeopleRequest } from "@noresponse/node/models/operations";

let value: AddPeopleRequest = {
  groupId: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  idempotencyKey: "account-acct_7f3a9c",
  body: {
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
  },
};
```

## Fields

| Field                                                                                                                                                             | Type                                                                                                                                                              | Required                                                                                                                                                          | Description                                                                                                                                                       | Example                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `groupId`                                                                                                                                                         | *string*                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                | N/A                                                                                                                                                               | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                    |
| `idempotencyKey`                                                                                                                                                  | *string*                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                | Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours. | account-acct_7f3a9c                                                                                                                                               |
| `body`                                                                                                                                                            | [models.PersonBatchRequest](../../models/person-batch-request.md)                                                                                                 | :heavy_check_mark:                                                                                                                                                | N/A                                                                                                                                                               |                                                                                                                                                                   |