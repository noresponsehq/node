# FindingBand

How severe a finding is, most severe first.

## Example Usage

```typescript
import { FindingBand } from "@noresponse/node/models";

let value: FindingBand = "moderate";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"critical" | "high" | "moderate" | "low" | "info" | Unrecognized<string>
```