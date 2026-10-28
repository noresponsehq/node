# Decision

The decision of the assessment's latest stored revision: block when its stored risk.block is true, otherwise its recommendation. This is not the account's current decision or held-admission state. Combined with recommendation using AND.

## Example Usage

```typescript
import { Decision } from "@noresponse/node/models";

let value: Decision = "allow";
```

## Values

```typescript
"allow" | "step_up" | "review" | "block"
```