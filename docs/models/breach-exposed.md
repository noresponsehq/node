# BreachExposed

The kind of data a breach table held beside the identifier. password means a plaintext password was present and password_hash means a hash, salt or token was present. The value itself is not stored or returned; the schema has no member for one.

## Example Usage

```typescript
import { BreachExposed } from "@noresponse/node/models";

let value: BreachExposed = "email";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"email" | "username" | "name" | "password" | "password_hash" | "phone" | "address" | "dob" | "ip" | "payment" | "security_qa" | Unrecognized<string>
```