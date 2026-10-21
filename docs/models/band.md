# Band

low 0-29, medium 30-59, high 60-84, critical 85-100.

## Example Usage

```typescript
import { Band } from "@noresponse/node/models";

let value: Band = "high";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"low" | "medium" | "high" | "critical" | Unrecognized<string>
```