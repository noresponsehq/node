# Bucket

The period each count covers, in UTC; a week starts on Monday.

## Example Usage

```typescript
import { Bucket } from "@noresponse/node/models";

let value: Bucket = "week";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"hour" | "day" | "week" | Unrecognized<string>
```