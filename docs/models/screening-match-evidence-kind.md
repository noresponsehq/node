# ScreeningMatchEvidenceKind

What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft. supplied_handle is a handle on the person row; source_fact is an account a profile found by the person's lookups lists.

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