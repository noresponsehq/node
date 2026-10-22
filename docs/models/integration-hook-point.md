# IntegrationHookPoint

pre_registration runs before the user exists; post_login runs after a successful sign-in.

## Example Usage

```typescript
import { IntegrationHookPoint } from "@noresponse/node/models";

let value: IntegrationHookPoint = "pre_registration";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"pre_registration" | "post_login" | Unrecognized<string>
```