# PersonScheduleRequest

The schedule to set.

## Example Usage

```typescript
import { PersonScheduleRequest } from "@noresponse/node/models";

let value: PersonScheduleRequest = {
  period: "weekly",
};
```

## Fields

| Field                                                                                                                                              | Type                                                                                                                                               | Required                                                                                                                                           | Description                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `period`                                                                                                                                           | [models.SchedulePeriod](../models/schedule-period.md)                                                                                              | :heavy_check_mark:                                                                                                                                 | How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation. |