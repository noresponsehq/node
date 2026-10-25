# PermissionDeniedErrorCode

Machine codes an HTTP 403 answer can carry.

## Example Usage

```typescript
import { PermissionDeniedErrorCode } from "@noresponse/node/models";

let value: PermissionDeniedErrorCode = "role_forbidden";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"workspace_forbidden" | "role_forbidden" | Unrecognized<string>
```