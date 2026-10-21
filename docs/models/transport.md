# Transport

Where the customer derived this context. Backend is the trusted integration path; browser values are treated as weak hints.

## Example Usage

```typescript
import { Transport } from "@noresponse/node/models";

let value: Transport = "browser";
```

## Values

```typescript
"backend" | "browser"
```