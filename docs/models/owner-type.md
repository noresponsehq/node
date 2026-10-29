# OwnerType

The credential namespace of the creator. An external user ID equal to an API-key label does not grant ownership of that key's private view.

## Example Usage

```typescript
import { OwnerType } from "@noresponse/node/models";

let value: OwnerType = "api_key";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"user" | "api_key" | Unrecognized<string>
```