# ProfileMatchState

How sure the screening is that a profile is the person's, from the likelihood its record scores. Confirmed reaches the join bar of 0.9. Probable reaches 0.85, which takes a shared value beyond the one that found the account. Possible is the rest.

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