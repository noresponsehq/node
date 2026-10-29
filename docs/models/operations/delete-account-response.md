# DeleteAccountResponse

## Example Usage

```typescript
import { DeleteAccountResponse } from "@noresponse/node/models/operations";

let value: DeleteAccountResponse = {
  headers: {},
  result: {
    schemaVersion: "1",
    id: "acct_7f3a9c",
    deleted: true,
    assessmentsDeleted: 487272,
    deletedAt: "2026-10-23T09:00:00.000Z",
    erasureId: "0123456789abcdef0123456789abcdef",
  },
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `headers`                                                  | Record<string, *string*[]>                                 | :heavy_check_mark:                                         | N/A                                                        |
| `result`                                                   | [models.AccountDeletion](../../models/account-deletion.md) | :heavy_check_mark:                                         | N/A                                                        |