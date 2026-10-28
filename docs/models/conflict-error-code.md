# ConflictErrorCode

Machine codes an HTTP 409 answer can carry.

## Example Usage

```typescript
import { ConflictErrorCode } from "@noresponse/node/models";

let value: ConflictErrorCode = "webhook_endpoint_unverified";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"idempotency_key_reused" | "key_rotation_in_progress" | "webhook_endpoint_limit_reached" | "webhook_endpoint_unverified" | "too_many_integrations" | "risk_version_ahead" | "key_limit_reached" | "self_revocation" | "list_entry_exists" | "list_limit_reached" | "list_entry_too_broad" | Unrecognized<string>
```