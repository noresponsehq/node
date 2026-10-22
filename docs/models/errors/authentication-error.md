# AuthenticationError

HTTP 401 problem document.

## Example Usage

```typescript
import { AuthenticationError } from "@noresponse/node/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                       | Type                                                                        | Required                                                                    | Description                                                                 | Example                                                                     |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `type`                                                                      | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         | https://docs.noresponse.org/errors/invalid_request                          |
| `title`                                                                     | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         | Invalid request                                                             |
| `status`                                                                    | *401*                                                                       | :heavy_check_mark:                                                          | N/A                                                                         |                                                                             |
| `detail`                                                                    | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         | identifiers: at least one of email, username or phone is required.          |
| `instance`                                                                  | *string*                                                                    | :heavy_minus_sign:                                                          | N/A                                                                         | /v1/assessments                                                             |
| `code`                                                                      | [models.AuthenticationErrorCode](../../models/authentication-error-code.md) | :heavy_check_mark:                                                          | Machine codes an HTTP 401 answer can carry.                                 |                                                                             |
| `requestId`                                                                 | *string*                                                                    | :heavy_check_mark:                                                          | N/A                                                                         | 9f2c4b7a1d3e4f5a8b6c0d1e2f3a4b5c                                            |
| `invalidParams`                                                             | [models.ProblemInvalidParam](../../models/problem-invalid-param.md)[]       | :heavy_minus_sign:                                                          | N/A                                                                         |                                                                             |