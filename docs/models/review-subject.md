# ReviewSubject

A tenant-local investigation link. risk_version is the account risk version captured when the link was added. It does not assert a relationship or change feedback or enforcement.

## Example Usage

```typescript
import { ReviewSubject } from "@noresponse/node/models";

let value: ReviewSubject = {
  id: "rvs_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  kind: "issued_credential",
  accountId: "acct_7f3a9c",
  assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  credentialId: "cred_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  riskVersion: 753428,
  reason: "Linked during review of the account evidence.",
  createdBy: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  createdAt: "2026-01-01T00:00:00Z",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          | rvs_01JA2Z8K6Q4V7W9XBCDEFGHJKM                               |
| `kind`                                                       | [models.ReviewSubjectKind](../models/review-subject-kind.md) | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `accountId`                                                  | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          | acct_7f3a9c                                                  |
| `assessmentId`                                               | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          | asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM                               |
| `assessmentVersion`                                          | *number*                                                     | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `credentialId`                                               | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          | cred_01JA2Z8K6Q4V7W9XBCDEFGHJKM                              |
| `riskVersion`                                                | *number*                                                     | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `reason`                                                     | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          | Linked during review of the account evidence.                |
| `createdBy`                                                  | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          | mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM                               |
| `createdAt`                                                  | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          | 2026-01-01T00:00:00Z                                         |