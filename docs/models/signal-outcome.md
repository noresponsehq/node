# SignalOutcome

Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.

## Example Usage

```typescript
import { SignalOutcome } from "@noresponse/node/models";

let value: SignalOutcome = "blocked";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"found" | "not_found" | "inconclusive" | "blocked" | "unavailable" | Unrecognized<string>
```