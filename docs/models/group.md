# Group

A workspace group for a building, organization or event. Dates are optional and do not control person retention.

## Example Usage

```typescript
import { Group } from "@noresponse/node/models";

let value: Group = {
  id: "grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  environment: "live",
  name: "Annual shareholder meeting",
  startsAt: "2026-01-01T00:00:00Z",
  endsAt: "2026-01-02T00:00:00Z",
  venue: "Example Convention Centre",
  host: "Example Holdings",
  principals: [],
  topics: [
    "executive pay",
  ],
  people: 805619,
  version: 106969,
  createdBy: "user_2abc",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};
```

## Fields

| Field                                                                                       | Type                                                                                        | Required                                                                                    | Description                                                                                 | Example                                                                                     |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `id`                                                                                        | *string*                                                                                    | :heavy_check_mark:                                                                          | N/A                                                                                         | grp_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                              |
| `environment`                                                                               | [models.AuditSettingsEnvironment](../models/audit-settings-environment.md)                  | :heavy_check_mark:                                                                          | N/A                                                                                         |                                                                                             |
| `name`                                                                                      | *string*                                                                                    | :heavy_check_mark:                                                                          | The group's name.                                                                           | Annual shareholder meeting                                                                  |
| `startsAt`                                                                                  | *string*                                                                                    | :heavy_check_mark:                                                                          | Optional event start; null for an ongoing group.                                            | 2026-01-01T00:00:00Z                                                                        |
| `endsAt`                                                                                    | *string*                                                                                    | :heavy_check_mark:                                                                          | Optional event end; requires starts_at and must be at or after it. Null when no end is set. | 2026-01-02T00:00:00Z                                                                        |
| `venue`                                                                                     | *string*                                                                                    | :heavy_minus_sign:                                                                          | Where the group is held.                                                                    | Example Convention Centre                                                                   |
| `host`                                                                                      | *string*                                                                                    | :heavy_minus_sign:                                                                          | The organisation hosting the group.                                                         | Example Holdings                                                                            |
| `principals`                                                                                | [models.Principal](../models/principal.md)[]                                                | :heavy_check_mark:                                                                          | The people the group protects.                                                              |                                                                                             |
| `topics`                                                                                    | *string*[]                                                                                  | :heavy_check_mark:                                                                          | Sensitive topics.                                                                           |                                                                                             |
| `people`                                                                                    | *number*                                                                                    | :heavy_check_mark:                                                                          | How many people the group holds.                                                            |                                                                                             |
| `version`                                                                                   | *number*                                                                                    | :heavy_check_mark:                                                                          | Goes up by one with every change.                                                           |                                                                                             |
| `createdBy`                                                                                 | *string*                                                                                    | :heavy_check_mark:                                                                          | The member or key label that created the group.                                             | user_2abc                                                                                   |
| `createdAt`                                                                                 | *string*                                                                                    | :heavy_check_mark:                                                                          | N/A                                                                                         | 2026-01-01T00:00:00Z                                                                        |
| `updatedAt`                                                                                 | *string*                                                                                    | :heavy_check_mark:                                                                          | N/A                                                                                         | 2026-01-01T00:00:00Z                                                                        |