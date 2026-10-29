# PolicyEvaluationStatus

## Example Usage

```typescript
import { PolicyEvaluationStatus } from "@noresponse/node/models";

let value: PolicyEvaluationStatus = "cancelled";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"queued" | "running" | "completed" | "failed" | "cancelled" | Unrecognized<string>
```