# ListAccountsResponse

## Example Usage

```typescript
import { ListAccountsResponse } from "@noresponse/node/models/operations";

let value: ListAccountsResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [
      "example 1",
      "example 2",
    ],
    "key2": [
      "example 1",
    ],
  },
  result: {
    items: [],
    nextCursor: "eyJ4IjoxMDQyLCJhIjoiOWYyYyJ9",
  },
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `headers`                                          | Record<string, *string*[]>                         | :heavy_check_mark:                                 | N/A                                                |
| `result`                                           | [models.AccountList](../../models/account-list.md) | :heavy_check_mark:                                 | N/A                                                |