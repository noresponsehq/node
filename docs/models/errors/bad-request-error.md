# BadRequestError

HTTP 400 problem document.

## Example Usage

```typescript
import { BadRequestError } from "@noresponse/node/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `type`                                                                | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `title`                                                               | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `status`                                                              | *400*                                                                 | :heavy_check_mark:                                                    | N/A                                                                   |
| `detail`                                                              | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `instance`                                                            | *string*                                                              | :heavy_minus_sign:                                                    | N/A                                                                   |
| `code`                                                                | [models.BadRequestErrorCode](../../models/bad-request-error-code.md)  | :heavy_check_mark:                                                    | Machine codes an HTTP 400 answer can carry.                           |
| `requestId`                                                           | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `invalidParams`                                                       | [models.ProblemInvalidParam](../../models/problem-invalid-param.md)[] | :heavy_minus_sign:                                                    | N/A                                                                   |