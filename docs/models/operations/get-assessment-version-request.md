# GetAssessmentVersionRequest

## Example Usage

```typescript
import { GetAssessmentVersionRequest } from "@noresponse/node/models/operations";

let value: GetAssessmentVersionRequest = {
  assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  version: 581771,
};
```

## Fields

| Field                                                                                                             | Type                                                                                                              | Required                                                                                                          | Description                                                                                                       | Example                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `assessmentId`                                                                                                    | *string*                                                                                                          | :heavy_check_mark:                                                                                                | Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400. | asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                    |
| `responseMode`                                                                                                    | [models.ResponseMode](../../models/response-mode.md)                                                              | :heavy_minus_sign:                                                                                                | Optional standard or separately authorised detailed customer view; raw is rejected.                               |                                                                                                                   |
| `version`                                                                                                         | *number*                                                                                                          | :heavy_check_mark:                                                                                                | The stored assessment_version, in canonical decimal form. An unavailable or malformed version answers 404.        |                                                                                                                   |