# Origin

api (the default) searches the assessments your integration sent. lookup searches the assessments your team ran by hand on the console's Lookup page. The API sets an assessment's origin from the credential that sent it. A lookup is not in any other list, count, webhook event or account.

## Example Usage

```typescript
import { Origin } from "@noresponse/node/models";

let value: Origin = "api";
```

## Values

```typescript
"api" | "lookup"
```