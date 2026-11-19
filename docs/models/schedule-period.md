# SchedulePeriod

How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation.

## Example Usage

```typescript
import { SchedulePeriod } from "@noresponse/node/models";

let value: SchedulePeriod = "daily";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"daily" | "weekly" | "monthly" | "off" | Unrecognized<string>
```