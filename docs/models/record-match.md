# RecordMatch

One searched value that found the record.

## Example Usage

```typescript
import { RecordMatch } from "@noresponse/node/models";

let value: RecordMatch = {
  by: "handle",
  field: "username",
};
```

## Fields

| Field                                                                                               | Type                                                                                                | Required                                                                                            | Description                                                                                         | Example                                                                                             |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `by`                                                                                                | *string*                                                                                            | :heavy_check_mark:                                                                                  | The kind of searched value: email, phone, username, name, or handle for a profile read of a handle. | handle                                                                                              |
| `field`                                                                                             | *string*                                                                                            | :heavy_minus_sign:                                                                                  | The field the searched value hit, when the record holds it.                                         | username                                                                                            |