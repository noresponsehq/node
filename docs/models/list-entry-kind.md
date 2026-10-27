# ListEntryKind

email matches one address, whatever the case of its local part. email_domain matches every address of the registrable domain and of its subdomains.

## Example Usage

```typescript
import { ListEntryKind } from "@noresponse/node/models";

let value: ListEntryKind = "email_domain";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"email" | "email_domain" | Unrecognized<string>
```