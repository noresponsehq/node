# Filter

## Example Usage

```typescript
import { Filter } from "@noresponse/node/models";

let value: Filter = {
  assignee: "usr_customer_admin",
  assigneePrincipalId: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
};
```

## Fields

| Field                                             | Type                                              | Required                                          | Description                                       | Example                                           |
| ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `status`                                          | [models.ReviewStatus](../models/review-status.md) | :heavy_minus_sign:                                | N/A                                               |                                                   |
| `priority`                                        | [models.Priority](../models/priority.md)          | :heavy_minus_sign:                                | N/A                                               |                                                   |
| `assignee`                                        | *string*                                          | :heavy_minus_sign:                                | N/A                                               | usr_customer_admin                                |
| `unassigned`                                      | *boolean*                                         | :heavy_minus_sign:                                | N/A                                               |                                                   |
| `assigneePrincipalId`                             | *string*                                          | :heavy_minus_sign:                                | N/A                                               | mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM                    |