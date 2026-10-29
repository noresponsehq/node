# ReviewSubjectChange

The link and resulting review version.

## Example Usage

```typescript
import { ReviewSubjectChange } from "@noresponse/node/models";

let value: ReviewSubjectChange = {
  reviewVersion: 185644,
  subject: {
    id: "rvs_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    kind: "assessment",
    accountId: "acct_7f3a9c",
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    credentialId: "cred_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    riskVersion: 151796,
    reason: "Linked during review of the account evidence.",
    createdBy: "mem_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    createdAt: "2026-01-01T00:00:00Z",
  },
};
```

## Fields

| Field                                                                                                                                                                              | Type                                                                                                                                                                               | Required                                                                                                                                                                           | Description                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reviewVersion`                                                                                                                                                                    | *number*                                                                                                                                                                           | :heavy_check_mark:                                                                                                                                                                 | N/A                                                                                                                                                                                |
| `subject`                                                                                                                                                                          | [models.ReviewSubject](../models/review-subject.md)                                                                                                                                | :heavy_check_mark:                                                                                                                                                                 | A tenant-local investigation link. risk_version is the account risk version captured when the link was added. It does not assert a relationship or change feedback or enforcement. |