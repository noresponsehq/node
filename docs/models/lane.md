# Lane

An evidence lane: accounts (account presence for email and username), phone, breach and ip.

## Example Usage

```typescript
import { Lane } from "@noresponse/node/models";

let value: Lane = "accounts";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"accounts" | "phone" | "breach" | "ip" | Unrecognized<string>
```