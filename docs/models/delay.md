# Delay

How long after the assessment's creation the change was made.

## Example Usage

```typescript
import { Delay } from "@noresponse/node/models";

let value: Delay = "under_10s";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"under_10s" | "under_1m" | "under_10m" | "under_1h" | "under_1d" | "over_1d" | Unrecognized<string>
```