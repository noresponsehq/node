# KeyStatus

active: the key authenticates. expired: a rotation's overlap window has ended (expires_at). revoked: the key was revoked (revoked_at) and answers 401.

## Example Usage

```typescript
import { KeyStatus } from "@noresponse/node/models";

let value: KeyStatus = "expired";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"active" | "expired" | "revoked" | Unrecognized<string>
```