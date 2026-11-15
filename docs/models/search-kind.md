# SearchKind

The kind of the value searched. A domain search finds the leaked rows of every email address at the domain.

## Example Usage

```typescript
import { SearchKind } from "@noresponse/node/models";

let value: SearchKind = "username";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"email" | "phone" | "username" | "person_name" | "password" | "hash" | "ip" | "domain" | Unrecognized<string>
```