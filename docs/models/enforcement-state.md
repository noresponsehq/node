# EnforcementState

The account's state in the workspace's identity provider just before the action: onboarding, provisional (created, not yet activated), active, restricted or rejected.

## Example Usage

```typescript
import { EnforcementState } from "@noresponse/node/models";

let value: EnforcementState = "active";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"onboarding" | "provisional" | "active" | "restricted" | "rejected" | Unrecognized<string>
```