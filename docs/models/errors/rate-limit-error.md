# RateLimitError

HTTP 429 problem document.

## Example Usage

```typescript
import { RateLimitError } from "@noresponse/node/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `type`                                                                | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `title`                                                               | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `status`                                                              | *429*                                                                 | :heavy_check_mark:                                                    | N/A                                                                   |
| `detail`                                                              | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `instance`                                                            | *string*                                                              | :heavy_minus_sign:                                                    | N/A                                                                   |
| `code`                                                                | [models.RateLimitErrorCode](../../models/rate-limit-error-code.md)    | :heavy_check_mark:                                                    | Machine codes an HTTP 429 answer can carry.                           |
| `requestId`                                                           | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `invalidParams`                                                       | [models.ProblemInvalidParam](../../models/problem-invalid-param.md)[] | :heavy_minus_sign:                                                    | N/A                                                                   |