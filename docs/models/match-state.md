# MatchState

How sure the latest screening is that it found the attendee's accounts. unscreened until a screening reaches the attendee.

## Example Usage

```typescript
import { MatchState } from "@noresponse/node/models";

let value: MatchState = "confirmed";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"unscreened" | "confirmed" | "probable" | "possible" | "none_found" | "inaccessible" | Unrecognized<string>
```