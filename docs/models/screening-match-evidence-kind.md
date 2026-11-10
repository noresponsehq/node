# ScreeningMatchEvidenceKind

What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft.

## Example Usage

```typescript
import { ScreeningMatchEvidenceKind } from "@noresponse/node/models";

let value: ScreeningMatchEvidenceKind = "company";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"email" | "phone" | "supplied_handle" | "source_fact" | "name" | "company" | "city" | "school" | Unrecognized<string>
```