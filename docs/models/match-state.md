# MatchState

How sure the latest screening is that it found the person's accounts. unscreened until a screening reaches the person, and after one that had no profile to check (no_profile_to_check).

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