# ReasonIdentifier

The submitted identifier or client context field a reason concerns; absent when it concerns the whole assessment. Client context is a claimed hint, not a device fingerprint.

## Example Usage

```typescript
import { ReasonIdentifier } from "@noresponse/node/models";

let value: ReasonIdentifier = "name";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"email" | "username" | "phone" | "name" | "ip" | "context" | Unrecognized<string>
```