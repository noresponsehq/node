# RecordConflictSignal

anchors_disagree: records found by two of the identifiers you gave clash with each other, so those identifiers may belong to different people.

## Example Usage

```typescript
import { RecordConflictSignal } from "@noresponse/node/models";

let value: RecordConflictSignal = "anchors_disagree";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"anchors_disagree" | Unrecognized<string>
```