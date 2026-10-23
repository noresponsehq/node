# AccountDecision

block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.

## Example Usage

```typescript
import { AccountDecision } from "@noresponse/node/models";

let value: AccountDecision = "block";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"allow" | "step_up" | "review" | "block" | Unrecognized<string>
```