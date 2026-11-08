# Event

An event and its screening context.

## Example Usage

```typescript
import { Event } from "@noresponse/node/models";

let value: Event = {
  id: "evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  environment: "live",
  name: "Annual shareholder meeting",
  startsAt: "2026-01-01T00:00:00Z",
  endsAt: "2026-01-02T00:00:00Z",
  venue: "Example Convention Centre",
  host: "Example Holdings",
  principals: [
    {
      name: "Alex Principal",
      aliases: [
        "Alex P",
      ],
    },
  ],
  topics: [
    "executive pay",
  ],
  attendees: 335805,
  version: 784842,
  purgeAfter: "2026-02-01T00:00:00Z",
  createdBy: "user_2abc",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};
```

## Fields

| Field                                                                                               | Type                                                                                                | Required                                                                                            | Description                                                                                         | Example                                                                                             |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `id`                                                                                                | *string*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 | evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                      |
| `environment`                                                                                       | [models.AuditSettingsEnvironment](../models/audit-settings-environment.md)                          | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `name`                                                                                              | *string*                                                                                            | :heavy_check_mark:                                                                                  | The event's name.                                                                                   | Annual shareholder meeting                                                                          |
| `startsAt`                                                                                          | *string*                                                                                            | :heavy_check_mark:                                                                                  | When the event starts.                                                                              | 2026-01-01T00:00:00Z                                                                                |
| `endsAt`                                                                                            | *string*                                                                                            | :heavy_check_mark:                                                                                  | When the event ends, at or after its start; the start when omitted.                                 | 2026-01-02T00:00:00Z                                                                                |
| `venue`                                                                                             | *string*                                                                                            | :heavy_minus_sign:                                                                                  | Where the event is held.                                                                            | Example Convention Centre                                                                           |
| `host`                                                                                              | *string*                                                                                            | :heavy_minus_sign:                                                                                  | The organisation hosting the event.                                                                 | Example Holdings                                                                                    |
| `principals`                                                                                        | [models.Principal](../models/principal.md)[]                                                        | :heavy_check_mark:                                                                                  | The people the event protects.                                                                      |                                                                                                     |
| `topics`                                                                                            | *string*[]                                                                                          | :heavy_check_mark:                                                                                  | Sensitive topics.                                                                                   |                                                                                                     |
| `attendees`                                                                                         | *number*                                                                                            | :heavy_check_mark:                                                                                  | How many attendees the event holds.                                                                 |                                                                                                     |
| `version`                                                                                           | *number*                                                                                            | :heavy_check_mark:                                                                                  | Goes up by one with every change.                                                                   |                                                                                                     |
| `purgeAfter`                                                                                        | *string*                                                                                            | :heavy_check_mark:                                                                                  | When raw collected items and unmatched candidate profiles are purged: 30 days after the event ends. | 2026-02-01T00:00:00Z                                                                                |
| `createdBy`                                                                                         | *string*                                                                                            | :heavy_check_mark:                                                                                  | The member or key label that created the event.                                                     | user_2abc                                                                                           |
| `createdAt`                                                                                         | *string*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 | 2026-01-01T00:00:00Z                                                                                |
| `updatedAt`                                                                                         | *string*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 | 2026-01-01T00:00:00Z                                                                                |