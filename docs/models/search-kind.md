# SearchKind

The kind of the value searched.

## Example Usage

```typescript
import { SearchKind } from "@noresponse/node/models";

let value: SearchKind = "username";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"email" | "phone" | "username" | "person_name" | "password" | "hash" | "ip" | Unrecognized<string>
```