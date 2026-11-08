# AttendeeIdentity

What you know about an attendee. Stored encrypted under the workspace's key.

## Example Usage

```typescript
import { AttendeeIdentity } from "@noresponse/node/models";

let value: AttendeeIdentity = {
  externalId: "ticket-1042",
  name: "Jordan Example",
  email: "jordan@company-example.com",
  phone: "+14155550100",
  company: "Example Ltd",
  city: "Melbourne",
  handles: [
    {
      platform: "instagram",
      handle: "jordan_example",
    },
  ],
};
```

## Fields

| Field                                                                                                               | Type                                                                                                                | Required                                                                                                            | Description                                                                                                         | Example                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `externalId`                                                                                                        | *string*                                                                                                            | :heavy_minus_sign:                                                                                                  | Your own id for the attendee, unique within the event. A later row with the same external id updates this attendee. | ticket-1042                                                                                                         |
| `name`                                                                                                              | *string*                                                                                                            | :heavy_check_mark:                                                                                                  | The attendee's full name.                                                                                           | Jordan Example                                                                                                      |
| `email`                                                                                                             | *string*                                                                                                            | :heavy_minus_sign:                                                                                                  | The attendee's email.                                                                                               | jordan@company-example.com                                                                                          |
| `phone`                                                                                                             | *string*                                                                                                            | :heavy_minus_sign:                                                                                                  | The attendee's phone in E.164 form.                                                                                 | +14155550100                                                                                                        |
| `company`                                                                                                           | *string*                                                                                                            | :heavy_minus_sign:                                                                                                  | Where the attendee works.                                                                                           | Example Ltd                                                                                                         |
| `city`                                                                                                              | *string*                                                                                                            | :heavy_minus_sign:                                                                                                  | Where the attendee lives.                                                                                           | Melbourne                                                                                                           |
| `handles`                                                                                                           | [models.Handle](../models/handle.md)[]                                                                              | :heavy_minus_sign:                                                                                                  | Accounts the attendee is known to hold, at most 20.                                                                 |                                                                                                                     |