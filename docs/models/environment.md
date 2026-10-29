# Environment

## Example Usage

```typescript
import { Environment } from "@noresponse/node/models";

let value: Environment = "test";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"live" | "test" | "workspace" | Unrecognized<string>
```