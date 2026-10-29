# Confidence

Evidence coverage: how much of the planned source evidence gave a definite answer. This is not confidence that an identity is genuine, agreement between identifiers, a risk score or a probability. unavailable means no usable evidence answered; a terminal uncovered assessment can have this value and recommend review.

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