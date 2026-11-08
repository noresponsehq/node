# Principal

A person the event protects.

## Example Usage

```typescript
import { Principal } from "@noresponse/node/models";

let value: Principal = {
  name: "Alex Principal",
  aliases: [
    "Alex P",
  ],
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    | Example                                        |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `name`                                         | *string*                                       | :heavy_check_mark:                             | The principal's name.                          | Alex Principal                                 |
| `aliases`                                      | *string*[]                                     | :heavy_minus_sign:                             | Other names the principal goes by, at most 10. |                                                |