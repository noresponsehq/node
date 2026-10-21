# ConsistencyValue

How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.

## Example Usage

```typescript
import { ConsistencyValue } from "@noresponse/node/models";

let value: ConsistencyValue = "match";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"match" | "partial" | "mismatch" | "unknown" | Unrecognized<string>
```