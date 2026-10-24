# EnforcementAction

What the workspace did in its identity provider: revoke_sessions (signed the account out everywhere), restrict (limited what the account can do), unrestrict (lifted an earlier restriction), fail_onboarding (stopped an account that was still onboarding), reject_activation (refused to activate a provisional account) or none (decided to take no action).

## Example Usage

```typescript
import { EnforcementAction } from "@noresponse/node/models";

let value: EnforcementAction = "fail_onboarding";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"revoke_sessions" | "restrict" | "unrestrict" | "fail_onboarding" | "reject_activation" | "none" | Unrecognized<string>
```