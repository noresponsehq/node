# SuggestedSearchKind

The kind of the value: one of the kinds the environment's enrichment setting names.

## Example Usage

```typescript
import { SuggestedSearchKind } from "@noresponse/node/models";

let value: SuggestedSearchKind = "username";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"username" | "email" | "phone" | Unrecognized<string>
```