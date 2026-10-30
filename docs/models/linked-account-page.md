# LinkedAccountPage

Other accounts in this workspace and environment whose retained assessments submitted an email, phone or customer-namespace username that one of account_id's retained assessments also submitted. Matching uses the identifier search rules: exact, canonical and, for email, mailbox. Only customer-submitted identifiers link accounts; source-discovered identifiers do not. Expired, retention-shortened, deleted and erased assessments link nothing. A shared identifier is not verified ownership. Accounts use stable opaque order, the page and total share one database snapshot, and later pages are live. Cursors bind the workspace, environment, operation and account_id, and expire.

## Example Usage

```typescript
import { LinkedAccountPage } from "@noresponse/node/models";

let value: LinkedAccountPage = {
  schemaVersion: "1",
  accountId: "acct_7f3a9c",
  items: [
    {
      accountId: "acct_91b2d4",
      sharedIdentifiers: [
        {
          kind: "email",
          matchBasis: "mailbox",
          provenance: "submitted",
          account: {
            value: "jane.doe@gmail.com",
            assessmentId: "asm_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
            submittedAt: "2026-10-14T09:00:00.412Z",
          },
          linkedAccount: {
            value: "janedoe+2@gmail.com",
            assessmentId: "asm_01JA3B1C2D3E4F5G6H7J8K9M0N",
            submittedAt: "2026-10-20T17:42:10.006Z",
          },
        },
      ],
    },
  ],
  total: 1,
  totalCapped: false,
};
```

## Fields

| Field                                                                                                 | Type                                                                                                  | Required                                                                                              | Description                                                                                           | Example                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `schemaVersion`                                                                                       | *"1"*                                                                                                 | :heavy_check_mark:                                                                                    | Version of the body shape.                                                                            |                                                                                                       |
| `accountId`                                                                                           | *string*                                                                                              | :heavy_check_mark:                                                                                    | The account whose submitted identifiers were compared. It is excluded from items.                     | acct_7f3a9c                                                                                           |
| `items`                                                                                               | [models.LinkedAccount](../models/linked-account.md)[]                                                 | :heavy_check_mark:                                                                                    | N/A                                                                                                   |                                                                                                       |
| `total`                                                                                               | *number*                                                                                              | :heavy_check_mark:                                                                                    | Distinct linked accounts, exact below 10000 and capped at 10000.                                      |                                                                                                       |
| `totalCapped`                                                                                         | *boolean*                                                                                             | :heavy_check_mark:                                                                                    | True when at least 10000 accounts are linked.                                                         |                                                                                                       |
| `nextCursor`                                                                                          | *string*                                                                                              | :heavy_minus_sign:                                                                                    | Opaque, expiring cursor bound to this environment, operation and account_id. Absent on the last page. | eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ                            |