# InvestigationStatus

## Example Usage

```typescript
import { InvestigationStatus } from "@noresponse/node/models";

let value: InvestigationStatus = "completed";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"queued" | "running" | "completed" | "partial" | "failed" | "cancelled" | "unknown" | Unrecognized<string>
```