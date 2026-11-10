# ScreeningLookupCheckStatus

found: a source found the identifier. not_found: every source answered and none found it. partial: the sources that answered found nothing and the others did not answer. not_covered: no source answered. A lookup that failed reads partial or not_covered, not not_found.

## Example Usage

```typescript
import { ScreeningLookupCheckStatus } from "@noresponse/node/models";

let value: ScreeningLookupCheckStatus = "not_covered";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"found" | "not_found" | "partial" | "not_covered" | Unrecognized<string>
```