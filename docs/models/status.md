# Status

Processing state, separate from evidence coverage. complete: final; nothing is still running, but unsupported, failed or unanswered lanes remain in incomplete_sources. partial: a recommendation exists and evidence is incomplete; assessment_url identifies continuing work when present. pending: no recommendation yet; poll or wait for the webhook. Finished processing does not mean all sources answered.

## Example Usage

```typescript
import { Status } from "@noresponse/node/models";

let value: Status = "partial";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"complete" | "partial" | "pending" | Unrecognized<string>
```