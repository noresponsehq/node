# RecordAssessmentOutcomeRequest

## Example Usage

```typescript
import { RecordAssessmentOutcomeRequest } from "@noresponse/node/models/operations";

let value: RecordAssessmentOutcomeRequest = {
  assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  idempotencyKey: "signup-acct_7f3a9c",
  body: {
    outcome: "unknown",
    observedAt: "2026-10-14T09:04:30.000Z",
    externalRef: "case-48213",
    notes: "Chargeback filed two days after signup.",
  },
};
```

## Fields

| Field                                                                                                                                                          | Type                                                                                                                                                           | Required                                                                                                                                                       | Description                                                                                                                                                    | Example                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assessmentId`                                                                                                                                                 | *string*                                                                                                                                                       | :heavy_check_mark:                                                                                                                                             | Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.                                              | asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                 |
| `idempotencyKey`                                                                                                                                               | *string*                                                                                                                                                       | :heavy_check_mark:                                                                                                                                             | Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the tenant principal and bound to the canonical body for 24 hours. | signup-acct_7f3a9c                                                                                                                                             |
| `body`                                                                                                                                                         | [models.AssessmentOutcomeRequest](../../models/assessment-outcome-request.md)                                                                                  | :heavy_check_mark:                                                                                                                                             | N/A                                                                                                                                                            |                                                                                                                                                                |