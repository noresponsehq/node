# ErrorCode

Why a failed search found nothing: its sources did not answer, none could be asked, or it could not run before its attempts were spent.

## Example Usage

```typescript
import { ErrorCode } from "@noresponse/node/models";

let value: ErrorCode = "no_source";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"not_answered" | "no_source" | "worker_attempts_exhausted" | Unrecognized<string>
```