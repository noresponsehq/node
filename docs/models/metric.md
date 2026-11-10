# Metric

assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted. screenings: attendees a screening recorded a final result for, one per attendee per screening; a failed attendee counts only when its lookups were kept.

## Example Usage

```typescript
import { Metric } from "@noresponse/node/models";

let value: Metric = "screenings";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"assessments" | "webhook_deliveries" | "key_usage_events" | "screenings" | Unrecognized<string>
```