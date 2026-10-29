# ReviewViewRequest

## Example Usage

```typescript
import { ReviewViewRequest } from "@noresponse/node/models";

let value: ReviewViewRequest = {
  name: "High priority reviews",
  shared: true,
  filter: {
    assignee: "usr_customer_admin",
    assigneePrincipalId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          | Example                              |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `name`                               | *string*                             | :heavy_check_mark:                   | N/A                                  | High priority reviews                |
| `shared`                             | *boolean*                            | :heavy_check_mark:                   | N/A                                  |                                      |
| `expectedVersion`                    | *number*                             | :heavy_minus_sign:                   | N/A                                  |                                      |
| `filter`                             | [models.Filter](../models/filter.md) | :heavy_check_mark:                   | N/A                                  |                                      |