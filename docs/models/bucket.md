# Bucket

The period each count covers: an hour, or a day or a week (from Monday) in time_zone. Hour buckets are whole UTC hours in any time zone.

## Example Usage

```typescript
import { Bucket } from "@noresponse/node/models";

let value: Bucket = "week";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"hour" | "day" | "week" | Unrecognized<string>
```