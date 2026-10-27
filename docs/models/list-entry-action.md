# ListEntryAction

block decides block for the accounts the entry matches; allow decides allow. Block wins when both match.

## Example Usage

```typescript
import { ListEntryAction } from "@noresponse/node/models";

let value: ListEntryAction = "block";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"block" | "allow" | Unrecognized<string>
```