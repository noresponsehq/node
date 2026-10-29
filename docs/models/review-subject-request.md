# ReviewSubjectRequest

An assessment link also requires assessment_id and assessment_version; an issued_credential link also requires credential_id. Every reference must belong to account_id in this environment. Other kinds reject those fields.

## Example Usage

```typescript
import { ReviewSubjectRequest } from "@noresponse/node/models";

let value: ReviewSubjectRequest = {
  kind: "issued_credential",
  accountId: "acct_7f3a9c",
  assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  credentialId: "cred_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  reason: "Linked during review of the account evidence.",
  expectedVersion: 491449,
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `kind`                                                       | [models.ReviewSubjectKind](../models/review-subject-kind.md) | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `accountId`                                                  | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          | acct_7f3a9c                                                  |
| `assessmentId`                                               | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          | asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM                               |
| `assessmentVersion`                                          | *number*                                                     | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `credentialId`                                               | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          | cred_01JA2Z8K6Q4V7W9XBCDEFGHJKM                              |
| `reason`                                                     | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          | Linked during review of the account evidence.                |
| `expectedVersion`                                            | *number*                                                     | :heavy_check_mark:                                           | N/A                                                          |                                                              |