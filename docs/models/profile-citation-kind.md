# ProfileCitationKind

record: a record in lookup.records or profiles[].record. post: an item in posts. check: an item in lookup.checks.

## Example Usage

```typescript
import { ProfileCitationKind } from "@noresponse/node/models";

let value: ProfileCitationKind = "post";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"record" | "post" | "check" | Unrecognized<string>
```