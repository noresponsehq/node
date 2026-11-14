# Verdict

A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.

## Example Usage

```typescript
import { Verdict } from "@noresponse/node/models";

let value: Verdict = "joined";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"joined" | "rejected" | Unrecognized<string>
```