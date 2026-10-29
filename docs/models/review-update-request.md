# ReviewUpdateRequest

## Example Usage

```typescript
import { ReviewUpdateRequest } from "@noresponse/node/models";

let value: ReviewUpdateRequest = {
  expectedVersion: 401997,
  assignee: "usr_customer_admin",
};
```

## Fields

| Field                                                                         | Type                                                                          | Required                                                                      | Description                                                                   | Example                                                                       |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `expectedVersion`                                                             | *number*                                                                      | :heavy_check_mark:                                                            | N/A                                                                           |                                                                               |
| `status`                                                                      | [models.ReviewUpdateRequestStatus](../models/review-update-request-status.md) | :heavy_minus_sign:                                                            | N/A                                                                           |                                                                               |
| `priority`                                                                    | [models.Priority](../models/priority.md)                                      | :heavy_minus_sign:                                                            | N/A                                                                           |                                                                               |
| `assignee`                                                                    | *string*                                                                      | :heavy_minus_sign:                                                            | N/A                                                                           | usr_customer_admin                                                            |