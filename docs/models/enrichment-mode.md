# EnrichmentMode

off: enrichment starts no search and suggests none. suggest: enrichment starts no search by itself, and the person report lists the searches it would start in suggested_searches. automatic: after a workspace person's own investigation or a group's screening, and each time a search on that person finishes, enrichment starts searches by itself. A group takes suggest while the workspace has not set a mode.

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