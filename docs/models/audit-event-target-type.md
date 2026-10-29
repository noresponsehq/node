# AuditEventTargetType

The kind of resource the change acted on.

## Example Usage

```typescript
import { AuditEventTargetType } from "@noresponse/node/models";

let value: AuditEventTargetType = "member";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"workspace" | "member" | "invite" | "key" | "setting" | "webhook_endpoint" | "integration" | "billing" | "review" | Unrecognized<string>
```