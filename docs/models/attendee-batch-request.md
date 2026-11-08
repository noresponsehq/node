# AttendeeBatchRequest

Adds or updates 1 to 500 attendees. A row naming an existing attendee of the event (the same external_id, else the same email, else the same phone) updates it.

## Example Usage

```typescript
import { AttendeeBatchRequest } from "@noresponse/node/models";

let value: AttendeeBatchRequest = {
  attendees: [
    {
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
    },
  ],
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `attendees`                                                 | [models.AttendeeIdentity](../models/attendee-identity.md)[] | :heavy_check_mark:                                          | N/A                                                         |