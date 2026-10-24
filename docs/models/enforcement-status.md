# EnforcementStatus

applied when the identity provider accepted the action, failed when it refused it or could not be reached. Only applied counts as enforced.

## Example Usage

```typescript
import { EnforcementStatus } from "@noresponse/node/models";

let value: EnforcementStatus = "applied";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"applied" | "failed" | Unrecognized<string>
```