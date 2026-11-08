# AttendeeList

Attendees in upload order.

## Example Usage

```typescript
import { AttendeeList } from "@noresponse/node/models";

let value: AttendeeList = {
  items: [],
  nextAfter: "att_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                | Example                                    |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `items`                                    | [models.Attendee](../models/attendee.md)[] | :heavy_check_mark:                         | N/A                                        |                                            |
| `nextAfter`                                | *string*                                   | :heavy_minus_sign:                         | Pass as after to read the next page.       | att_01JA2Z8K6Q4V7W9XBCDEFGHJKM             |