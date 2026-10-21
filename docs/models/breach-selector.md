# BreachSelector

The submitted identifier a breach table matched on: email or username. Phone and name are not breach selectors.

## Example Usage

```typescript
import { BreachSelector } from "@noresponse/node/models";

let value: BreachSelector = "username";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"email" | "username" | "ip" | Unrecognized<string>
```