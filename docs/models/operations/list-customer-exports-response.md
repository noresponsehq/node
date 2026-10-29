# ListCustomerExportsResponse

## Example Usage

```typescript
import { ListCustomerExportsResponse } from "@noresponse/node/models/operations";

let value: ListCustomerExportsResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
    "key1": [],
  },
  result: {
    items: [],
    nextCursor: "eyJwYWdlIjoyfQ",
  },
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `headers`                                                         | Record<string, *string*[]>                                        | :heavy_check_mark:                                                | N/A                                                               |
| `result`                                                          | [models.CustomerExportList](../../models/customer-export-list.md) | :heavy_check_mark:                                                | N/A                                                               |