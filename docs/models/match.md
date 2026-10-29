# Match

exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.

## Example Usage

```typescript
import { Match } from "@noresponse/node/models";

let value: Match = "exact";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"exact" | "canonical" | "mailbox" | Unrecognized<string>
```