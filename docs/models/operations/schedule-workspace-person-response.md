# ScheduleWorkspacePersonResponse

## Example Usage

```typescript
import { ScheduleWorkspacePersonResponse } from "@noresponse/node/models/operations";

let value: ScheduleWorkspacePersonResponse = {
  headers: {},
  result: {
    period: "off",
    nextRunAt: "2026-01-03T00:00:00Z",
    lastInvestigationId: "inv_01JA2Z8K6Q4V7W9XBCDEFGHJKN",
    lastError: "screening_cap_exceeded",
    updatedAt: "2026-01-02T00:00:00Z",
    updatedBy: "Jane Analyst",
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `headers`                                                | Record<string, *string*[]>                               | :heavy_check_mark:                                       | N/A                                                      |
| `result`                                                 | [models.PersonSchedule](../../models/person-schedule.md) | :heavy_check_mark:                                       | N/A                                                      |