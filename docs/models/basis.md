# Basis

stated: read from a record. inferred: reasoned from several facts. absence: every source answered and none found it.

## Example Usage

```typescript
import { Basis } from "@noresponse/node/models";

let value: Basis = "absence";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"stated" | "inferred" | "absence" | Unrecognized<string>
```