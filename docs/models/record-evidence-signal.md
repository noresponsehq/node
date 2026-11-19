# RecordEvidenceSignal

found_by: what found the record, which sets where its likelihood starts. agrees: a value the record shares with what the investigator gave or with a joined record. clashes: a birth date, full name, gender or country that differs from theirs.

## Example Usage

```typescript
import { RecordEvidenceSignal } from "@noresponse/node/models";

let value: RecordEvidenceSignal = "clashes";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"found_by" | "agrees" | "clashes" | Unrecognized<string>
```