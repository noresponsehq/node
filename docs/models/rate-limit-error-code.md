# RateLimitErrorCode

Machine codes an HTTP 429 answer can carry.

## Example Usage

```typescript
import { RateLimitErrorCode } from "@noresponse/node/models";

let value: RateLimitErrorCode = "rate_limited";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"rate_limited" | Unrecognized<string>
```