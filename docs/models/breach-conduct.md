# BreachConduct

What a breach table's rows record against the identifier: chargeback, one or more chargebacks; declined_payment, one or more declined payments; forum_sanction, a forum ban, warning or infraction. A category and not a value: the schema has no member for one.

## Example Usage

```typescript
import { BreachConduct } from "@noresponse/node/models";

let value: BreachConduct = "forum_sanction";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"chargeback" | "declined_payment" | "forum_sanction" | Unrecognized<string>
```