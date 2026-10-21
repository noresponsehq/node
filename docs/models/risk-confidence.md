# RiskConfidence

How much of the planned evidence answered; it says nothing about risk.

## Example Usage

```typescript
import { RiskConfidence } from "@noresponse/node/models";

let value: RiskConfidence = "medium";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"low" | "medium" | "high" | Unrecognized<string>
```