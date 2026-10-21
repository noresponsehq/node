# Freshness

Freshness class of the evidence behind a signal. unknown whenever no evidence was obtained.

## Example Usage

```typescript
import { Freshness } from "@noresponse/node/models";

let value: Freshness = "stale";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"fresh" | "stale" | "unknown" | Unrecognized<string>
```