# Flow

The provider flow the assessment gates. Use the top-level flow instead; this member is ignored when the top-level flow is present. Absent means signup.

## Example Usage

```typescript
import { Flow } from "@noresponse/node/models";

let value: Flow = "signup";
```

## Values

```typescript
"signup" | "login" | "recovery" | "profile_change"
```