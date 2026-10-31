# Attribute

name_gender is the records' gender against the submitted first name's usual one.

## Example Usage

```typescript
import { Attribute } from "@noresponse/node/models";

let value: Attribute = "name_gender";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"birth_date" | "gender" | "nationality" | "name_gender" | Unrecognized<string>
```