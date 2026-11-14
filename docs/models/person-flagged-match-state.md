# PersonFlaggedMatchState

How sure the screening is that the accounts it read are the person's. A finding on a possible match is at most moderate, on a probable match at most high.

## Example Usage

```typescript
import { PersonFlaggedMatchState } from "@noresponse/node/models";

let value: PersonFlaggedMatchState = "possible";
```

## Values

```typescript
"confirmed" | "probable" | "possible" | "none_found" | "inaccessible"
```