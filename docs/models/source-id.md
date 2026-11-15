# SourceId

A NoResponse source: github (GitHub accounts), phone (the phone lookup), breach (breach exposure), rdap (the email domain's registration), mx (the email domain's mail servers), ipintel (IP intelligence) or an email account source that searches one platform for an account by email address (adobe, nvidia, wix, life360, zapier, google). google runs only for Gmail addresses. scratch, dailymotion, substack, duolingo, dockerhub, wikipedia, internetarchive, telegram, spotify, patreon, wordpress, okru and flickr each search that platform for an account by username. whatsapp searches WhatsApp for an account by phone number.

## Example Usage

```typescript
import { SourceId } from "@noresponse/node/models";

let value: SourceId = "whatsapp";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"github" | "phone" | "breach" | "rdap" | "mx" | "ipintel" | "adobe" | "nvidia" | "wix" | "life360" | "zapier" | "google" | "scratch" | "dailymotion" | "substack" | "duolingo" | "dockerhub" | "wikipedia" | "internetarchive" | "telegram" | "spotify" | "patreon" | "wordpress" | "okru" | "flickr" | "whatsapp" | Unrecognized<string>
```