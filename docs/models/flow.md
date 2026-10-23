# Flow

The customer event an assessment is made for: signup (a new account), login (a returning sign-in) or purchase (a payment or credit grant). The account's risk is reported with the decision for this flow.

## Example Usage

```typescript
import { Flow } from "@noresponse/node/models";

let value: Flow = "signup";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"signup" | "login" | "purchase" | Unrecognized<string>
```