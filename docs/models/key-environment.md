# KeyEnvironment

The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.

## Example Usage

```typescript
import { KeyEnvironment } from "@noresponse/node/models";

let value: KeyEnvironment = "test";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"live" | "test" | Unrecognized<string>
```