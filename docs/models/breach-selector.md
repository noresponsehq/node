# BreachSelector

The submitted email or username whose own search matched the table. A submitted full name is searched as well, and what it finds feeds the identity's reasons rather than this list.

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