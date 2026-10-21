# IncompleteReason

Why a lane did not settle. deferred means the lane is asynchronous and still running; a continuation settles it. timed_out means the lane missed its deadline. insufficient_evidence is a settled inconclusive signal rather than an incomplete lane.

## Example Usage

```typescript
import { IncompleteReason } from "@noresponse/node/models";

let value: IncompleteReason = "deferred";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"timed_out" | "rate_limited" | "blocked" | "source_error" | "unavailable" | "deferred" | Unrecognized<string>
```