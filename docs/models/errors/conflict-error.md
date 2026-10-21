# ConflictError

HTTP 409 problem document.

## Example Usage

```typescript
import { ConflictError } from "@noresponse/node/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `type`                                                                | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `title`                                                               | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `status`                                                              | *409*                                                                 | :heavy_check_mark:                                                    | N/A                                                                   |
| `detail`                                                              | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `instance`                                                            | *string*                                                              | :heavy_minus_sign:                                                    | N/A                                                                   |
| `code`                                                                | [models.ConflictErrorCode](../../models/conflict-error-code.md)       | :heavy_check_mark:                                                    | Machine codes an HTTP 409 answer can carry.                           |
| `requestId`                                                           | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `invalidParams`                                                       | [models.ProblemInvalidParam](../../models/problem-invalid-param.md)[] | :heavy_minus_sign:                                                    | N/A                                                                   |