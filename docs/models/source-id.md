# SourceId

A NoResponse source: github (GitHub accounts), phone (the phone lookup), breach (breach exposure), rdap (the email domain's registration), mx (the email domain's mail servers) or ipintel (IP intelligence).

## Example Usage

```typescript
import { SourceId } from "@noresponse/node/models";

let value: SourceId = "ipintel";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"github" | "phone" | "breach" | "rdap" | "mx" | "ipintel" | Unrecognized<string>
```