# Access

public profiles were read; a private or locked one exists but could not be read.

## Example Usage

```typescript
import { Access } from "@noresponse/node/models";

let value: Access = "private";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"public" | "private" | "locked" | Unrecognized<string>
```