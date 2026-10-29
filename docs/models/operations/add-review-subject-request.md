# AddReviewSubjectRequest

## Example Usage

```typescript
import { AddReviewSubjectRequest } from "@noresponse/node/models/operations";

let value: AddReviewSubjectRequest = {
  workspaceId: "tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  environment: "test",
  reviewId: "<id>",
  body: {
    kind: "issued_credential",
    accountId: "acct_7f3a9c",
    assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    credentialId: "cred_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
    reason: "Linked during review of the account evidence.",
    expectedVersion: 927846,
  },
};
```

## Fields

| Field                                                                                                                                                                  | Type                                                                                                                                                                   | Required                                                                                                                                                               | Description                                                                                                                                                            | Example                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `workspaceId`                                                                                                                                                          | *string*                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                     | Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.                                     | tnt_01JA2Z8K6Q4V7W9XBCDEFGHJKM                                                                                                                                         |
| `environment`                                                                                                                                                          | [models.KeyEnvironment](../../models/key-environment.md)                                                                                                               | :heavy_check_mark:                                                                                                                                                     | The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404. |                                                                                                                                                                        |
| `reviewId`                                                                                                                                                             | *string*                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                     | N/A                                                                                                                                                                    |                                                                                                                                                                        |
| `body`                                                                                                                                                                 | [models.ReviewSubjectRequest](../../models/review-subject-request.md)                                                                                                  | :heavy_check_mark:                                                                                                                                                     | N/A                                                                                                                                                                    |                                                                                                                                                                        |