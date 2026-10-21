# Confidence

Ordinal confidence in the recommendation under the current policy: low, medium, high or unavailable.

## Example Usage

```typescript
import { Confidence } from "@noresponse/node/models";

let value: Confidence = "high";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"low" | "medium" | "high" | "unavailable" | Unrecognized<string>
```