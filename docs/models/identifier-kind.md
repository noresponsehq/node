# IdentifierKind

Which submitted identifier a signal concerns. ip is a selector of breach_exposure only.

## Example Usage

```typescript
import { IdentifierKind } from "@noresponse/node/models";

let value: IdentifierKind = "email";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"email" | "username" | "phone" | "ip" | Unrecognized<string>
```