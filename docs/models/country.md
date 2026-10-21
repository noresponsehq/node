# Country

IP country, phone country, breach countries and policy_context.region together.

## Example Usage

```typescript
import { Country } from "@noresponse/node/models";

let value: Country = "unknown";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"consistent" | "mismatch" | "unknown" | Unrecognized<string>
```