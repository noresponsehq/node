# LastError

## Example Usage

```typescript
import { LastError } from "@noresponse/node/models";

let value: LastError = "idempotency_key_reused";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"screening_cap_exceeded" | "screening_unavailable" | "person_not_found" | "idempotency_key_reused" | Unrecognized<string>
```