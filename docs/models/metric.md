# Metric

assessments: assessments admitted. webhook_deliveries: events sent to endpoints, one per event per endpoint. key_usage_events: key-usage events accepted.

## Example Usage

```typescript
import { Metric } from "@noresponse/node/models";

let value: Metric = "key_usage_events";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"assessments" | "webhook_deliveries" | "key_usage_events" | Unrecognized<string>
```