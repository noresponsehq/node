# Transport

Where the context was derived: backend (also when the request named no transport), browser, or provider_hook for a hosted provider hook.

## Example Usage

```typescript
import { Transport } from "@noresponse/node/models";

let value: Transport = "provider_hook";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"backend" | "browser" | "provider_hook" | Unrecognized<string>
```