# Lane

An evidence lane: accounts (account presence for email and username), phone, breach, domain (the email domain's registration) and ip.

## Example Usage

```typescript
import { Lane } from "@noresponse/node/models";

let value: Lane = "phone";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"accounts" | "phone" | "breach" | "domain" | "ip" | Unrecognized<string>
```