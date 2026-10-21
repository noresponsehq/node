# BadRequestErrorCode

Machine codes an HTTP 400 answer can carry.

## Example Usage

```typescript
import { BadRequestErrorCode } from "@noresponse/node/models";

let value: BadRequestErrorCode = "invalid_request";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"invalid_request" | "invalid_idempotency_key" | "invalid_cursor" | Unrecognized<string>
```