# Admission

immediate (the default): an assessment of this flow is decided from the evidence its answer has, and later evidence may change the decision. held: while the account's current assessment of this flow has not completed, the account's decision for the flow is held, and the final decision arrives as account.risk_changed when the investigation completes or hold_seconds pass, whichever is first. Each flow has its own admission.

## Example Usage

```typescript
import { Admission } from "@noresponse/node/models";

let value: Admission = "immediate";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"immediate" | "held" | Unrecognized<string>
```