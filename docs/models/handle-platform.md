# HandlePlatform

A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.

## Example Usage

```typescript
import { HandlePlatform } from "@noresponse/node/models";

let value: HandlePlatform = "synthetic";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"instagram" | "x" | "bluesky" | "youtube" | "tiktok" | "facebook" | "threads" | "reddit" | "telegram" | "linkedin" | "synthetic" | Unrecognized<string>
```