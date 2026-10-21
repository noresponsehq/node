# Recommendation

The recommended action: allow, step_up or review. Your application applies it.

## Example Usage

```typescript
import { Recommendation } from "@noresponse/node/models";

let value: Recommendation = "step_up";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"allow" | "step_up" | "review" | Unrecognized<string>
```