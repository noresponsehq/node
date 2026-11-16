# Certainty

confirmed: a linked record or the searched identifier states it directly. likely: a strong inference. possible: a weak inference.

## Example Usage

```typescript
import { Certainty } from "@noresponse/node/models";

let value: Certainty = "likely";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"confirmed" | "likely" | "possible" | Unrecognized<string>
```