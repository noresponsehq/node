# ListAccountEnforcementsResponse

## Example Usage

```typescript
import { ListAccountEnforcementsResponse } from "@noresponse/node/models/operations";

let value: ListAccountEnforcementsResponse = {
  headers: {
    "key": [
      "example 1",
    ],
  },
  result: {
    accountId: "acct_7f3a9c",
    items: [
      {
        id: "enf_01JA2ZF5N6P7Q8R9S0T1V2W3X4",
        accountId: "acct_7f3a9c",
        riskVersion: 548486,
        flow: "account_creation",
        action: "activate",
        stateBefore: "rejected",
        status: "applied",
        provider: "custom",
        errorCode: "clerk.rate_limited",
        createdAt: "2026-10-14T09:00:02.000Z",
      },
    ],
    nextCursor:
      "eyJ0IjoxNzY3MjI1NjAwMDAwMDAwLCJpIjoiYXNtX2V4YW1wbGUiLCJlIjoxNzY3MjI5MjAwfQ",
  },
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `headers`                                                                 | Record<string, *string*[]>                                                | :heavy_check_mark:                                                        | N/A                                                                       |
| `result`                                                                  | [models.AccountEnforcementList](../../models/account-enforcement-list.md) | :heavy_check_mark:                                                        | N/A                                                                       |