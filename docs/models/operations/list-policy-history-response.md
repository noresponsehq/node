# ListPolicyHistoryResponse

## Example Usage

```typescript
import { ListPolicyHistoryResponse } from "@noresponse/node/models/operations";

let value: ListPolicyHistoryResponse = {
  headers: {
    "key": [
      "example 1",
    ],
    "key1": [],
    "key2": [
      "example 1",
    ],
  },
  result: {
    items: [],
    hasMore: false,
    historyComplete: false,
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `headers`                                              | Record<string, *string*[]>                             | :heavy_check_mark:                                     | N/A                                                    |
| `result`                                               | [models.PolicyHistory](../../models/policy-history.md) | :heavy_check_mark:                                     | N/A                                                    |