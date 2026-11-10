# AttendeeRole

The attendee's role at the event: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: an attendee without one has no role, not guest. A later row naming the same attendee replaces it, and a change of role alone keeps the attendee's screening results.

## Example Usage

```typescript
import { AttendeeRole } from "@noresponse/node/models";

let value: AttendeeRole = "press";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"guest" | "crew" | "vendor" | "press" | Unrecognized<string>
```