# ResponseMode

standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.

## Example Usage

```typescript
import { ResponseMode } from "@noresponse/node/models";

let value: ResponseMode = "detailed";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"standard" | "detailed" | Unrecognized<string>
```