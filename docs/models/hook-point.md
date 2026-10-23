# HookPoint

The provider event a provider_hook context was sent for; absent for any other transport.

## Example Usage

```typescript
import { HookPoint } from "@noresponse/node/models";

let value: HookPoint = "post_registration";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"pre_registration" | "post_registration" | "pre_login" | "post_login" | "token_issuance" | Unrecognized<string>
```