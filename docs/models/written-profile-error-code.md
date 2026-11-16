# WrittenProfileErrorCode

Present only when status is failed. no_writer: no profile writer serves this environment. refused: the model refused. not_written: the answer was not a profile, or no statement survived grounding. uncited_statement: a statement or lead cited a record the person does not hold. not_answered: the writer did not answer. worker_attempts_exhausted: the worker stopped retrying.

## Example Usage

```typescript
import { WrittenProfileErrorCode } from "@noresponse/node/models";

let value: WrittenProfileErrorCode = "worker_attempts_exhausted";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"no_writer" | "refused" | "not_written" | "uncited_statement" | "not_answered" | "worker_attempts_exhausted" | Unrecognized<string>
```