# RateLimitErrorCode

Machine codes an HTTP 429 answer can carry.

## Example Usage

```typescript
import { RateLimitErrorCode } from "@noresponse/node/models";

let value: RateLimitErrorCode = "export_limit_reached";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"rate_limited" | "assessment_budget_exhausted" | "export_limit_reached" | Unrecognized<string>
```