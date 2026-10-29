# Role

A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.

## Example Usage

```typescript
import { Role } from "@noresponse/node/models";

let value: Role = "developer";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"owner" | "admin" | "developer" | "viewer" | "investigator" | "auditor" | "billing" | Unrecognized<string>
```