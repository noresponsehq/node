# OtherEvents

Where else in the environment the attendee appears, read live from those events: deleting one removes it here.

## Example Usage

```typescript
import { OtherEvents } from "@noresponse/node/models";

let value: OtherEvents = {
  total: 778440,
  items: [
    {
      eventId: "evn_01J9Y3C2M4N6P8Q0RSTVWXYZAB",
      eventName: "Spring gala",
      eventStartsAt: "2025-09-01T09:00:00Z",
      attendeeId: "att_01J9Y3C2M4N6P8Q0RSTVWXYZAB",
      matchedOn: [],
      matchState: "none_found",
      highestBand: "moderate",
      decision: "watch",
      decidedBy: "user_2abc",
      decidedAt: "2025-09-01T12:00:00Z",
    },
  ],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `total`                                                                            | *number*                                                                           | :heavy_check_mark:                                                                 | How many attendees of other events match, of which items lists the 20 most recent. |
| `items`                                                                            | [models.OtherEvent](../models/other-event.md)[]                                    | :heavy_check_mark:                                                                 | The 20 attendees of the most recent other events, newest event first.              |