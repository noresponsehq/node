# Significance

One rule ranks every change: identity changes (accounts, breaches, identifiers) are high, profile fields are medium, new posts are low.

## Example Usage

```typescript
import { Significance } from "@noresponse/node/models";

let value: Significance = "low";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"high" | "medium" | "low" | Unrecognized<string>
```