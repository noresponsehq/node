# EnforcementProvider

The identity provider the action ran in; custom for the workspace's own user store.

## Example Usage

```typescript
import { EnforcementProvider } from "@noresponse/node/models";

let value: EnforcementProvider = "clerk";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"clerk" | "workos" | "auth0" | "custom" | Unrecognized<string>
```