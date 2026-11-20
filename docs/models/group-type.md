# GroupType

What the group's people share: an event, an organisation, a place or another attribute.

## Example Usage

```typescript
import { GroupType } from "@noresponse/node/models";

let value: GroupType = "organisation";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"event" | "organisation" | "place" | "custom" | Unrecognized<string>
```