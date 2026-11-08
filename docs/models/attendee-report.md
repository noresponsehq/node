# AttendeeReport

Everything known about one attendee.

## Example Usage

```typescript
import { AttendeeReport } from "@noresponse/node/models";

let value: AttendeeReport = {
  attendee: {
    id: "att_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    eventId: "evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
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
    matchState: "inaccessible",
    highestBand: "moderate",
    decision: "escalated",
    decisionNote: "Known to the venue team.",
    decidedBy: "user_2abc",
    decidedAt: "2026-01-01T00:00:00Z",
    coverage: {},
    lastScreeningId: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    screenedAt: "2026-01-01T00:00:00Z",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  profiles: [],
  findings: [
    {},
  ],
  reviews: [
    {
      id: "arv_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
      decision: "cleared",
      note: "Known to the venue team.",
      createdBy: "user_2abc",
      createdAt: "2026-01-01T00:00:00Z",
    },
  ],
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `attendee`                                                     | [models.Attendee](../models/attendee.md)                       | :heavy_check_mark:                                             | An attendee and where their screening and review stand.        |
| `profiles`                                                     | [models.Profile](../models/profile.md)[]                       | :heavy_check_mark:                                             | The accounts the screening matched, with how each was matched. |
| `findings`                                                     | [models.Finding](../models/finding.md)[]                       | :heavy_check_mark:                                             | What the screening flagged, with its evidence.                 |
| `reviews`                                                      | [models.AttendeeReview](../models/attendee-review.md)[]        | :heavy_check_mark:                                             | Every recorded decision, oldest first.                         |