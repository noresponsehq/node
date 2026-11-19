# Identifier

## Example Usage

```typescript
import { Identifier } from "@noresponse/node/models";

let value: Identifier = "phone";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"email" | "phone" | "username" | "name" | Unrecognized<string>
```