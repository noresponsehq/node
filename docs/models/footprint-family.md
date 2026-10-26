# FootprintFamily

The source-neutral kind of evidence: account_presence (an account found on a site), auth_provider (the account at your auth provider), breach (breach and credential tables), breach_abuse (abuse and fraud communities' tables) and code_hosting (a code hosting profile).

## Example Usage

```typescript
import { FootprintFamily } from "@noresponse/node/models";

let value: FootprintFamily = "code_hosting";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"account_presence" | "auth_provider" | "breach" | "breach_abuse" | "code_hosting" | Unrecognized<string>
```