# Rating

unique: an email or phone, which belongs to one person by design. distinctive: rare enough that a new search on it likely finds one person. common: shared by many people, so a search on it finds strangers. A new search is suggested for unique and distinctive values only; any value can still be searched.

## Example Usage

```typescript
import { Rating } from "@noresponse/node/models";

let value: Rating = "unique";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"unique" | "distinctive" | "common" | Unrecognized<string>
```