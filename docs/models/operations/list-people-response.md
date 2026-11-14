# ListPeopleResponse

## Example Usage

```typescript
import { ListPeopleResponse } from "@noresponse/node/models/operations";

let value: ListPeopleResponse = {
  headers: {
    "key": [
      "example 1",
      "example 2",
    ],
  },
  result: {
    items: [],
    nextAfter: "per_01JA2Z8K6Q4V7W9XBCDEFGHJKM",
  },
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `headers`                                        | Record<string, *string*[]>                       | :heavy_check_mark:                               | N/A                                              |
| `result`                                         | [models.PersonList](../../models/person-list.md) | :heavy_check_mark:                               | N/A                                              |