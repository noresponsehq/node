# ScreeningStatus

partial finished with some attendees or platforms not covered; attendees_failed and attendees_partial count them.

## Example Usage

```typescript
import { ScreeningStatus } from "@noresponse/node/models";

let value: ScreeningStatus = "partial";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"queued" | "running" | "completed" | "partial" | "failed" | "cancelled" | Unrecognized<string>
```