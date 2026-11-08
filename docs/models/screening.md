# Screening

A screening and its progress.

## Example Usage

```typescript
import { Screening } from "@noresponse/node/models";

let value: Screening = {
  id: "scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  eventId: "evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  environment: "test",
  status: "running",
  depth: "standard",
  platforms: [
    "threads",
  ],
  requestedBy: "user_2abc",
  createdAt: "2026-01-01T00:00:00Z",
  startedAt: "2026-01-01T00:00:00Z",
  finishedAt: "2026-01-02T00:00:00Z",
  expiresAt: "2026-01-02T00:00:00Z",
  attendeesTotal: 672914,
  attendeesDone: 155536,
  attendeesFlagged: 61166,
  attendeesFailed: 886805,
  errorCode: "user_cancelled",
};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     | Example                                                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `id`                                                                            | *string*                                                                        | :heavy_check_mark:                                                              | N/A                                                                             | scn_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                  |
| `eventId`                                                                       | *string*                                                                        | :heavy_check_mark:                                                              | N/A                                                                             | evn_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                  |
| `environment`                                                                   | [models.AuditSettingsEnvironment](../models/audit-settings-environment.md)      | :heavy_check_mark:                                                              | N/A                                                                             |                                                                                 |
| `status`                                                                        | [models.ScreeningStatus](../models/screening-status.md)                         | :heavy_check_mark:                                                              | partial finished with some attendees not covered; attendees_failed counts them. |                                                                                 |
| `depth`                                                                         | [models.ScreeningDepth](../models/screening-depth.md)                           | :heavy_check_mark:                                                              | N/A                                                                             |                                                                                 |
| `platforms`                                                                     | [models.ScreeningPlatform](../models/screening-platform.md)[]                   | :heavy_check_mark:                                                              | N/A                                                                             |                                                                                 |
| `requestedBy`                                                                   | *string*                                                                        | :heavy_check_mark:                                                              | N/A                                                                             | user_2abc                                                                       |
| `createdAt`                                                                     | *string*                                                                        | :heavy_check_mark:                                                              | N/A                                                                             | 2026-01-01T00:00:00Z                                                            |
| `startedAt`                                                                     | *string*                                                                        | :heavy_minus_sign:                                                              | N/A                                                                             | 2026-01-01T00:00:00Z                                                            |
| `finishedAt`                                                                    | *string*                                                                        | :heavy_minus_sign:                                                              | N/A                                                                             | 2026-01-02T00:00:00Z                                                            |
| `expiresAt`                                                                     | *string*                                                                        | :heavy_check_mark:                                                              | A screening still running then fails with error_code expired.                   | 2026-01-02T00:00:00Z                                                            |
| `attendeesTotal`                                                                | *number*                                                                        | :heavy_check_mark:                                                              | Attendees selected when the screening started.                                  |                                                                                 |
| `attendeesDone`                                                                 | *number*                                                                        | :heavy_check_mark:                                                              | Attendees screened so far, failed ones included.                                |                                                                                 |
| `attendeesFlagged`                                                              | *number*                                                                        | :heavy_check_mark:                                                              | N/A                                                                             |                                                                                 |
| `attendeesFailed`                                                               | *number*                                                                        | :heavy_check_mark:                                                              | N/A                                                                             |                                                                                 |
| `errorCode`                                                                     | *string*                                                                        | :heavy_minus_sign:                                                              | Why a failed or cancelled screening stopped.                                    | user_cancelled                                                                  |