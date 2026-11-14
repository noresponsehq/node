# ProfileMatchState

How sure the screening is that a profile is the person's, from its evidence: confirmed is a handle on the person row, or two or more hard identifiers (email, phone, a supplied handle, or a fact an existing source returned); probable is one identifier beyond the name; possible is the name alone.

## Example Usage

```typescript
import { ProfileMatchState } from "@noresponse/node/models";

let value: ProfileMatchState = "confirmed";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"confirmed" | "probable" | "possible" | Unrecognized<string>
```