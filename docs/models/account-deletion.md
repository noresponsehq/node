# AccountDeletion

Body of the 200 answer to DELETE /v1/accounts/{account_id}: the calling workspace's account was erased in the environment of the calling key. Every assessment of the account went, with its revisions, evidence, outcomes and the identity-graph marks its outcomes set, and an assessment that was still running when the call arrived is stopped. Afterwards GET /v1/accounts/{account_id} and GET /v1/assessments/{assessment_id} of each erased assessment answer 404, and the history page is empty. The call is idempotent: a repeat, or an account with nothing to erase, answers 200 with assessments_deleted 0. The account_id can be assessed again later, as a new account.

## Example Usage

```typescript
import { AccountDeletion } from "@noresponse/node/models";

let value: AccountDeletion = {
  schemaVersion: "1",
  id: "acct_7f3a9c",
  deleted: true,
  assessmentsDeleted: 530006,
  deletedAt: "2026-10-23T09:00:00.000Z",
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              | Example                                                                                                  |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `schemaVersion`                                                                                          | *"1"*                                                                                                    | :heavy_check_mark:                                                                                       | Version of the body shape.                                                                               |                                                                                                          |
| `id`                                                                                                     | *string*                                                                                                 | :heavy_check_mark:                                                                                       | The account_id that was erased.                                                                          | acct_7f3a9c                                                                                              |
| `deleted`                                                                                                | *true*                                                                                                   | :heavy_check_mark:                                                                                       | N/A                                                                                                      |                                                                                                          |
| `assessmentsDeleted`                                                                                     | *number*                                                                                                 | :heavy_check_mark:                                                                                       | How many assessments this call deleted. 0 when the account had none left, so a repeat answers 0.         |                                                                                                          |
| `deletedAt`                                                                                              | *string*                                                                                                 | :heavy_check_mark:                                                                                       | When the erasure took effect. An assessment of the account begun before this time is refused or stopped. | 2026-10-23T09:00:00.000Z                                                                                 |