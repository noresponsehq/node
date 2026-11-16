# WrittenProfileStatus

queued: the profile is being written. written: summary, statements and leads hold it. failed: it could not be written; error_code says why and no content is returned.

## Example Usage

```typescript
import { WrittenProfileStatus } from "@noresponse/node/models";

let value: WrittenProfileStatus = "failed";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"queued" | "written" | "failed" | Unrecognized<string>
```