# PersonRole

The person's role in the group: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: a person without one has no role, not guest. A later row naming the same person replaces it, and a change of role alone keeps the person's screening results.

## Example Usage

```typescript
import { PersonRole } from "@noresponse/node/models";

let value: PersonRole = "crew";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"guest" | "crew" | "vendor" | "press" | Unrecognized<string>
```