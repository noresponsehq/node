# CreateAssessmentRequest

## Example Usage

```typescript
import { CreateAssessmentRequest } from "@noresponse/node/models/operations";

let value: CreateAssessmentRequest = {
  idempotencyKey: "<value>",
  body: {
    accountId: "<id>",
    identifiers: {},
  },
};
```

## Fields

| Field                                                                                                                                                          | Type                                                                                                                                                           | Required                                                                                                                                                       | Description                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idempotencyKey`                                                                                                                                               | *string*                                                                                                                                                       | :heavy_check_mark:                                                                                                                                             | Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the tenant principal and bound to the canonical body for 24 hours. |
| `body`                                                                                                                                                         | [models.AssessmentRequest](../../models/assessment-request.md)                                                                                                 | :heavy_check_mark:                                                                                                                                             | N/A                                                                                                                                                            |