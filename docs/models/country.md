# Country

IP country, phone country, breach countries and policy_context.region together. When the breach records give a country, the timezone and locale countries count too. The IP country of a proxy or hosting network does not count.

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