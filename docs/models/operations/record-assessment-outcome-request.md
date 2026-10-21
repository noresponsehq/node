# RecordAssessmentOutcomeRequest

## Example Usage

```typescript
import { RecordAssessmentOutcomeRequest } from "@noresponse/node/models/operations";

let value: RecordAssessmentOutcomeRequest = {
  assessmentId: "<id>",
  idempotencyKey: "<value>",
  body: {
    outcome: "unknown",
  },
};
```

## Fields

| Field                                                                                                                                                          | Type                                                                                                                                                           | Required                                                                                                                                                       | Description                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assessmentId`                                                                                                                                                 | *string*                                                                                                                                                       | :heavy_check_mark:                                                                                                                                             | Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.                                              |
| `idempotencyKey`                                                                                                                                               | *string*                                                                                                                                                       | :heavy_check_mark:                                                                                                                                             | Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the tenant principal and bound to the canonical body for 24 hours. |
| `body`                                                                                                                                                         | [models.AssessmentOutcomeRequest](../../models/assessment-outcome-request.md)                                                                                  | :heavy_check_mark:                                                                                                                                             | N/A                                                                                                                                                            |