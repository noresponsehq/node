# PermissionDeniedError

HTTP 403 problem document.

## Example Usage

```typescript
import { PermissionDeniedError } from "@noresponse/node/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `title`                                                                          | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `status`                                                                         | *403*                                                                            | :heavy_check_mark:                                                               | N/A                                                                              |
| `detail`                                                                         | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `instance`                                                                       | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |
| `code`                                                                           | [models.PermissionDeniedErrorCode](../../models/permission-denied-error-code.md) | :heavy_check_mark:                                                               | Machine codes an HTTP 403 answer can carry.                                      |
| `requestId`                                                                      | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `invalidParams`                                                                  | [models.ProblemInvalidParam](../../models/problem-invalid-param.md)[]            | :heavy_minus_sign:                                                               | N/A                                                                              |