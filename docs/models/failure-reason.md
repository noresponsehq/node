# FailureReason

Why a signal or source did not produce a definite found/not_found. timed_out means the source missed the request deadline; a continuation may still settle it. deferred means the (source, identifier) pair is async-only and was not attempted on the synchronous path; a continuation settles it.

## Example Usage

```typescript
import { FailureReason } from "@noresponse/node/models";

let value: FailureReason = "timed_out";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"timed_out" | "rate_limited" | "blocked" | "source_error" | "unavailable" | "deferred" | "insufficient_evidence" | Unrecognized<string>
```