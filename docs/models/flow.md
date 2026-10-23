# Flow

The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.

## Example Usage

```typescript
import { Flow } from "@noresponse/node/models";

let value: Flow = "account_creation";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"account_creation" | "login" | "purchase" | Unrecognized<string>
```