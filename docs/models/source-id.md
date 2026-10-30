# SourceId

A NoResponse source: github (GitHub accounts), phone (the phone lookup), breach (breach exposure), rdap (the email domain's registration), mx (the email domain's mail servers), ipintel (IP intelligence) or an email account source that searches one platform for an account by email address (adobe, nvidia, wix, life360, zapier).

## Example Usage

```typescript
import { SourceId } from "@noresponse/node/models";

let value: SourceId = "zapier";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"github" | "phone" | "breach" | "rdap" | "mx" | "ipintel" | "adobe" | "nvidia" | "wix" | "life360" | "zapier" | Unrecognized<string>
```