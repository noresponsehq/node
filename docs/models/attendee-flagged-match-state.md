# AttendeeFlaggedMatchState

How sure the screening is that the accounts it read are the attendee's. A finding on a possible match is at most moderate, on a probable match at most high.

## Example Usage

```typescript
import { AttendeeFlaggedMatchState } from "@noresponse/node/models";

let value: AttendeeFlaggedMatchState = "confirmed";
```

## Values

```typescript
"confirmed" | "probable" | "possible" | "none_found" | "inaccessible"
```