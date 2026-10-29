# AggregateGroupListMatch

The list action captured with the first answer. none means no matching entry was found. For retained_first_answers an absent field means the older assessment did not capture list state; this remains a separate group.

## Example Usage

```typescript
import { AggregateGroupListMatch } from "@noresponse/node/models";

let value: AggregateGroupListMatch = "block";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"block" | "allow" | "none" | Unrecognized<string>
```