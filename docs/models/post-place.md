# PostPlace

A place a post names, as the platform shows it.

## Example Usage

```typescript
import { PostPlace } from "@noresponse/node/models";

let value: PostPlace = {
  name: "Example Harbour",
  id: "212988663",
  address: "2 Wharf Road",
  city: "Melbourne",
};
```

## Fields

| Field                               | Type                                | Required                            | Description                         | Example                             |
| ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `name`                              | *string*                            | :heavy_check_mark:                  | N/A                                 | Example Harbour                     |
| `id`                                | *string*                            | :heavy_minus_sign:                  | The platform's own id of the place. | 212988663                           |
| `address`                           | *string*                            | :heavy_minus_sign:                  | N/A                                 | 2 Wharf Road                        |
| `city`                              | *string*                            | :heavy_minus_sign:                  | N/A                                 | Melbourne                           |
| `latitude`                          | *number*                            | :heavy_minus_sign:                  | N/A                                 |                                     |
| `longitude`                         | *number*                            | :heavy_minus_sign:                  | N/A                                 |                                     |