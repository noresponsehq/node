# EnrichmentMode

off: enrichment starts no search. suggest: enrichment starts no search by itself. automatic: after a workspace person's own investigation, and each time a search on that person finishes, enrichment starts searches by itself.

## Example Usage

```typescript
import { EnrichmentMode } from "@noresponse/node/models";

let value: EnrichmentMode = "automatic";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"off" | "suggest" | "automatic" | Unrecognized<string>
```