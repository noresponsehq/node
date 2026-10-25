# DefaultDepth

The depth a request for this flow that names none is served at. Defaults: full for account_creation and purchase, quick for login.

## Example Usage

```typescript
import { DefaultDepth } from "@noresponse/node/models";

let value: DefaultDepth = "full";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"quick" | "full" | Unrecognized<string>
```